import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';

import { BasketComponent } from './basket.component';
import { of } from 'rxjs';
import { BasketService } from './basket.service';
import { ProductService } from '../products/product.service';
import { UserService } from '../users/user.service';

class MockBasketService {
  items$ = of([
    { id: 1, quantity: 2 },
    { id: 2, quantity: 3 },
  ]);
  getBasketForUser = jasmine
    .createSpy()
    .and.returnValue(of({ products: [{ id: 1, quantity: 2 }] }));
}

class MockProductService {
  getProductById = jasmine
    .createSpy()
    .and.callFake((id) => of({ id, price: 100 }));
}

class MockUserService {
  getUserId = jasmine.createSpy().and.returnValue(1);
}

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasketComponent],
      providers: [
        { provide: BasketService, useClass: MockBasketService },
        { provide: ProductService, useClass: MockProductService },
        { provide: UserService, useClass: MockUserService },
      ],
      imports: [HttpClientModule, MatSnackBarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getBasketForUser on ngOnInit', () => {
    spyOn(component, 'getBasketForUser');
    component.ngOnInit();
    expect(component.getBasketForUser).toHaveBeenCalled();
  });

  it('should set productsInBasket$ observable', (done) => {
    component.getBasketForUser();
    component.productsInBasket$.subscribe((products) => {
      expect(products.length).toBe(1);
      done();
    });
  });

  it('should fetch products and set productsInBasket$ and total$', (done) => {
    component.getProductsInBasket();
    component.productsInBasket$.subscribe((products) => {
      expect(products.length).toBe(2);
      component.total$.subscribe((total) => {
        expect(total).toBe(500);
        done();
      });
    });
  });

  it('should set product quantities correctly', () => {
    component.setProductQuantities({ id: 3, quantity: 4 });
    expect(component.productQuantities[3]).toBe(4);
  });

  it('should calculate total correctly', (done) => {
    component.getProductsInBasket();
    component.total$.subscribe((total) => {
      expect(total).toBe(500);
      done();
    });
  });
});
