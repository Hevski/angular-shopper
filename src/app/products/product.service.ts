import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

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
  getProducts(limit: number): Observable<any> {
    return this.http.get(`${API_URL}/products?_limit=${limit}`)
     .pipe(map(products => {
       return products;
     }),
     catchError((error => {
      throw error;
     }))
     )
  }

  /**
   * Get product by id
   * @param productId 
   */
  getProductById(productId: number): Observable<any> {
    return this.http.get(`${API_URL}/products/${productId}`)
    .pipe(map(product => {
       return product;
     }),
      catchError((error => {
        throw error;
      }))
     )
  }
}
