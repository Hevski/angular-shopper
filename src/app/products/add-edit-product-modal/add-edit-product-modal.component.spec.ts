import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AddEditProductModalComponent } from './add-edit-product-modal.component';

describe('EditProductModalComponent', () => {
  let component: AddEditProductModalComponent;
  let fixture: ComponentFixture<AddEditProductModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditProductModalComponent ],
      imports: [MatSnackBarModule, HttpClientModule],
      providers: [NgbActiveModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
