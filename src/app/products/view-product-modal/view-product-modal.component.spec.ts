import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ViewProductModalComponent } from './view-product-modal.component';

describe('ViewProductModalComponent', () => {
  let component: ViewProductModalComponent;
  let fixture: ComponentFixture<ViewProductModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule],
      declarations: [ ViewProductModalComponent ],
      providers: [NgbActiveModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
