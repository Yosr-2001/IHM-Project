import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Evenement } from 'src/models/evenement';
import { HotelService } from './hotel.service';
import { Hotel } from 'src/models/hotel';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient,private hotelService: HotelService) { }

  getNomHotelById(id: string): Observable<{ nom: string, ville: string }> {
    return this.http.get<Hotel>(`${this.apiUrl}/hotels/${id}`).pipe(
      map(hotel => ({
        nom: hotel?.nom || 'Hôtel inconnu',
        ville: hotel?.adresse || 'Ville inconnue'
      })),
      catchError(() => of({ nom: 'Hôtel inconnu', ville: 'Ville inconnue' }))
    );
  }

  getEvenementsAvecHotels(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(`${this.apiUrl}/evenements`).pipe(
      switchMap(events => {
        if (!events || events.length === 0) return of([]);
        
        const requests = events.map(event => 
          this.getNomHotelById(event.idHotel).pipe(
            map(hotel => ({
              ...event,
              hotel: {
                nom: hotel.nom,
                ville: hotel.ville
              }
            }))
          )
        );
        
        return forkJoin(requests);
      }),
      catchError(error => {
        console.error('Erreur:', error);
        return of([]);
      })
    );
  }

  isUpcoming(date: Date): boolean {
    return new Date(date) > new Date();
  }

    creerEvent(event: Evenement): Observable<Evenement> {
      return this.http.post<Evenement>(this.apiUrl, event);
    }
}