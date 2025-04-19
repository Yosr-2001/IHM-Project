import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offre, Reservation } from 'src/models/offre';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000/reservations';
 
  constructor(private http: HttpClient) {}

  creerReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl, reservation);
  }
  getReservationsByClient(clientId: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`http://localhost:3000/reservations/${clientId}`);
  }
  getReservationsCreeesPar(userId: string) {
    return this.http.get<Reservation[]>(`${this.apiUrl}?userId=${userId}`);
  } 
  getOffreById(offreId: string): Observable<Offre> {
    return this.http.get<Offre>(`${this.apiUrl}/${offreId}`);
  }
  annulerReservation(reservationId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${reservationId}`, { statut: 'annulee' });
  }
  
  
}