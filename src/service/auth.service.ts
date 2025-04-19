import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUser = new BehaviorSubject<any | null>(null);
  currentUser$ = this._currentUser.asObservable();
  users: any[] = [];

  constructor(private http: HttpClient) {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      this._currentUser.next(JSON.parse(userString));
    }
  }




  login(email: string, password: string): Observable<{ user: any }> {
    return this.http.get<any[]>(`http://localhost:3000/users?username=${email}&password=${password}`)
      .pipe(
        map(users => {
          if (users.length === 0) {
            throw new Error('Identifiants invalides');
          }
          const user = users[0];
          this._currentUser.next(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          return { user };
        })
      );

  }

  revokeToken(): Observable<any> {
    return this.http.post<any>('/api/revoke-token', {}, { withCredentials: true }).pipe(
      tap(() => {
        console.log('Tokens refreshed successfully');
      })
    );
  }


  logout(): void {
    this._currentUser.next(null);
    localStorage.removeItem('hotelFilters');

    localStorage.removeItem('currentUser');
  }


  isConnected(): boolean {
    return this._currentUser.getValue() !== null;
  }

  getUserWithEmail(email: string): Observable<any> {
    return this.http.get<any[]>(`http://localhost:3000/users?email=${email}`)
      .pipe(
        map(users => users.length > 0 ? users[0] : null)
      );
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/users/${id}`);
  }

  modifyUser(user: any, id: string): Observable<any> {
    return this.getUserById(+id).pipe(
      map(existingUser => {

        if (!user.password) {
          user.password = existingUser.password;
        }
        return user;
      }),
      switchMap(updatedUser =>
        this.http.put<any>(`http://localhost:3000/users/${id}`, updatedUser).pipe(
          tap(finalUser => {
            const currentUser = this._currentUser.getValue();
            if (currentUser && currentUser.id === finalUser.id) {
              this._currentUser.next(finalUser);
              localStorage.setItem('currentUser', JSON.stringify(finalUser));
            }
          })
        )
      )
    );
  }


}
