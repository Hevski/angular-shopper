import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  // Inputs from parent component
  @Input() title = '';
  @Input() customHeader = false;
  @Input() customBody = false;
  @Input() customFooter = false;
  @Input() showConfirmationButton = true;
  @Input() confirmButtonText = 'Add item'
  closeButtonText = 'Close';
  body = ''

  constructor(
    private modalService: NgbActiveModal
    ) {
  }

  ngOnInit(): void {
  }

  /**
   * Dismiss the modal
   */
  dismiss(): void {
    this.modalService.dismiss();
  }

  /**
   * Closes the modal
   */
  close(): void {
    this.modalService.close(true);
  }

}
