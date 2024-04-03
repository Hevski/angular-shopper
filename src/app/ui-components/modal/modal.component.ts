import { Component, Input, OnInit, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() title = '';
  @Input() customHeader = false;
  @Input() customBody = false;
  @Input() customFooter = false;
  @Input() showConfirmationButton = true;
  @Input() confirmButtonText = '';
  readonly closeButtonText = 'Close';
  readonly body = '';
  private readonly modalService = inject(NgbActiveModal);

  dismiss(): void {
    this.modalService.dismiss();
  }

  close(): void {
    this.modalService.close(true);
  }
}
