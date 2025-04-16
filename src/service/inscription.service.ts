import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evenement } from 'src/models/evenement';
import { Inscription } from 'src/models/inscription';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  private apiUrl = 'http://localhost:3000/inscriptions'; 

  constructor(private http: HttpClient) { }
  
  ajouterInscription(inscription: Inscription): Observable<Inscription> {
    return this.http.post<Inscription>(this.apiUrl, inscription);
  }
  getInscriptionsParClient(clientId: string): Observable<Inscription[]> {
    const url = `${this.apiUrl}?idClient=${clientId}`;  
    return this.http.get<Inscription[]>(url);
    }

    getEvenementsParIds(ids: string[]): Observable<Evenement[]> {
      return this.http.get<Evenement[]>(`${this.apiUrl}?id_in=${ids.join(',')}`);
    }
}
