import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';

import { BasketService } from './basket.service';

describe('BasketService', () => {
  let service: BasketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule]
    });
    service = TestBed.inject(BasketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
