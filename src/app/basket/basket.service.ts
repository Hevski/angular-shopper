import { SnackbarService } from './../Utils/snackbar.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:8080'

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(
    private http: HttpClient,
    private snackbar : SnackbarService
  ) { }

  /**
   * Gets a basket for a specific user id
   * @param userId 
   */
  getBasketForUser(userId: number): Observable<any> {
    return this.http.get(`${API_URL}/carts/${userId}`)
      .pipe(map(cart => {
        return cart;
      }),
      catchError((error => {
      throw error;
      }))
    )
  }

  addItemToBasket(userId: number, body: any): Observable<any> {
    return this.http.post(`${API_URL}/carts/${userId}/products`, body)
      .pipe(map(carts => {
          return carts;
        }),
        catchError((error => {
          this.snackbar.onError(
            'Item not added',
            'error-snackbar'
          )
        throw error;
        }))
      )
    }
}
