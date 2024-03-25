import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { Injectable } from '@angular/core';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: any;
  userId = 4;

  constructor(private http: HttpClient) {}

  /**
   *
   * @returns Gets user by id
   */
  getUserById(): Observable<any> {
    return this.http.get(`${API_URL}/users/${this.userId}`).pipe(
      map((cart) => {
        return cart;
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  /**
   * Get the user id
   */
  getUserId(): any {
    return this.userId;
  }
}
