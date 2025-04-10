import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';
import { Offre, Reservation } from 'src/models/offre';

@Injectable({
  providedIn: 'root'
})
export class OffreService {
  private apiUrl = 'http://localhost:3000'; 
  constructor(private http :HttpClient) { }

  getOffresByHotel(hotelID: string):Observable<Offre[]>{
    return this.http.get<Offre[]>(`${this.apiUrl}/offres?hotelId=${hotelID}`);
  }

  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}/reservations`, reservation);
  }

  getOffreById(id: string): Observable<Offre> {
    return this.http.get<Offre>(`${this.apiUrl}/${id}`);
  }
  
  // getReservationsByUser(userId: string): Observable<Reservation[]> {
  //   return this.http.get<Reservation[]>(`${this.apiUrl}/reservations?clientId=${userId}`);
  // }

  // cancelReservation(reservationId: string): Observable<void> {
  //   return this.http.patch<void>(`${this.apiUrl}/reservations/${reservationId}`, { statut: 'annulée' });
  // }
}
