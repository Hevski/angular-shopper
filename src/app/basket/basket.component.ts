import { ProductService } from './../products/product.service';
import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basket: any;
  productsInBasket = [] as any;

  constructor(
    private basketService: BasketService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getBasketForUser();
  }

  /**
   * Get baksets for a specific user id
   */
  getBasketForUser(): void {
    // Hardcoded user id 1 - Would get this from the logged in user in an auth service using cookies, session storage or a user details resolver.
    this.basketService.getBasketForUser(1).subscribe(
      (basket) => {
        this.basket = basket;
        console.log(this.basket);
        this.getProductsInBasket();
      }
    )
  }

  /**
   * Get products in a basket
   */
  getProductsInBasket(): any {
    this.basket.products.forEach((item: any) => {
      this.getProductById(item.id);
    });
  }

  /**
   * Get product by id
   * @param productId 
   */
  getProductById(productId: number): any {
  this.productService.getProductById(productId).subscribe(
    (product => {
      this.productsInBasket.push(product);
      console.log(this.productsInBasket);
    })
  )
}
  

}
