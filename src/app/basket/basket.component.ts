import { UserService } from './../users/user.service';
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
  total = 0;
  productQuantities = {} as any;
  userId!: number;

  /**
   * Injects dependencies
   * @param basketService
   * @param productService 
   * @param userService 
   */
  constructor(
    private basketService: BasketService,
    private productService: ProductService,
    private userService: UserService
  ) { }

  /**
   * Initialises the component
   */
  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    this.getBasketForUser();
  }

  /**
   * Get baksets for a specific user id
   */
  getBasketForUser(): void {
    // Hardcoded user id - Would get this from the logged in user in an auth service using cookies, session storage or a user details resolver.
    this.basketService.getBasketForUser(this.userId).subscribe(
      (basket) => {
        this.basket = basket;
        this.getProductsInBasket();
      }
    );
  }

  /**
   * Get products in a basket
   */
  getProductsInBasket(): any {
    this.basket.products.forEach((product: any) => {
      this.setProductQuantities(product);
      this.getProductById(product.id);
    });
  }

  /**
   * Sets the product quantities as a lookup
   * @param product 
   */
  setProductQuantities(product: any): void {
    this.productQuantities[product.id] = product.quantity;
  }

  /**
   * Get product by id
   * @param productId 
   */
  getProductById(productId: number): any {
    this.productService.getProductById(productId).subscribe(
      (product => {
        this.productsInBasket.push(product);
        this.calculateTotal();
      })
    );
  }

  /**
   * Calculate the baskets total
   */
  calculateTotal(): any {
    this.total = 0;
    this.productsInBasket.forEach((product: any) => {
      const total = product.price * this.productQuantities[product.id];
      this.total += total;
    });
  }


}
