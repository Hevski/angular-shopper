import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
