 import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ComposantHotel, Hotel } from 'src/models/hotel';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HotelService {
  
  private apiUrl = 'http://localhost:3000';  

  constructor(private http: HttpClient) { }

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.apiUrl}/hotels`);
  }
 
  getHotelById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.apiUrl}/hotels/${id}`);
  }
 
  
  getComposantsByIds(ids: (string | number)[]): Observable<ComposantHotel[]> {
    return this.http.get<ComposantHotel[]>(`${this.apiUrl}/composantsHotel`).pipe(
      map(composants => { 
        const idsAsStrings = ids.map(id => id.toString());
        return composants.filter(comp => 
          idsAsStrings.includes(comp.id.toString())
        );
      })
    );
  }
}