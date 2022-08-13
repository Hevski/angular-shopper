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
  getProducts(limit: number, searchTerm: string): Observable<any> {
    // Normally I would use params to add the searchTerm but couldn't get it working so doing 2
    // seperate api calls instead.
    if (searchTerm) {
      return this.http.get(`${API_URL}/products?q=${searchTerm}`)
      .pipe(map(products => {
        return products;
      }),
      catchError((error => {
        throw error;
      }))
      )
    } else {
      return this.http.get(`${API_URL}/products?_limit=${limit}`)
      .pipe(map(products => {
        return products;
      }),
      catchError((error => {
        throw error;
      }))
      )
      }
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
