import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from 'src/models/offre';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000/reservations';
 
  constructor(private http: HttpClient) {}

  creerReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl, reservation);
  }
}