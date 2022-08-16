import { SnackbarService } from './../Utils/snackbar.service';
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
    private http: HttpClient,
    private snackbar: SnackbarService
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

  /**
   * Deletes a product from the list
   * @param productId 
   */
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${API_URL}/products/${productId}`)
      .pipe(map(product => {
        return product;
      }),
        catchError((error => {
          this.snackbar.onError(
            'Error deleting product',
            'error-snackbar'
          )
          throw error;
        }))
      )
  }

  /**
   * U[dates a product
   * @param productId 
   * @param productForm 
   */
  updateProduct(productId: number, productForm: any): Observable<any> {
    return this.http.patch(`${API_URL}/products/${productId}`, {
      name: productForm.name,
      description: productForm.description,
      price: productForm.price
    })
      .pipe(map(product => {
        return product;
      }),
        catchError((error => {
          this.snackbar.onError(
            'Error updating product',
            'error-snackbar'
          )
          throw error;
        }))
      )
  }
  

}
