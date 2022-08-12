import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:8080'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Gets the shops products
   */
  getProducts(): Observable<any> {
    return this.http.get(`${API_URL}/products`)
     .pipe(map(products => {
       return products;
     }),
     catchError((error => {
      throw error;
     }))
     )
  }
}
