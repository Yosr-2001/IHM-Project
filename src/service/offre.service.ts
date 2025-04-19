import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Hotel } from 'src/models/hotel';
import { Offre, Reservation } from 'src/models/offre';

@Injectable({
  providedIn: 'root'
})
export class OffreService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getOffresByHotel(hotelID: string): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.apiUrl}/offres?hotelId=${hotelID}`);

  }

  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}/reservations`, reservation);
  }

  getOffreById(id: string): Observable<Offre> {
    return this.http.get<Offre[]>(`${this.apiUrl}/offres?id=${id}`).pipe(
      map(offres => offres[0]) // récupérer la première offre (car c'est un tableau)
    );
  }
  getHotelById(hotelId: string): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.apiUrl}/hotels/${hotelId}`);
  }


}
