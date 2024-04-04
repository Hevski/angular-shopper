import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageModalComponent } from './message-modal.component';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';

describe('MessageModalComponent', () => {
  let component: MessageModalComponent;
  let fixture: ComponentFixture<MessageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageModalComponent],
      imports: [MatSnackBarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
