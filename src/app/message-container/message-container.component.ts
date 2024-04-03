import { Component, Input, inject } from '@angular/core';
import { MessageServiceService } from '../message-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageModalComponent } from '../message-modal/message-modal.component';

@Component({
  selector: 'app-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.css'],
})
export class MessageContainerComponent {
  @Input() isAdmin: boolean = false;
  private readonly messageService = inject(MessageServiceService);
  readonly messages$ = this.messageService.messages$;
  private readonly modalService = inject(NgbModal);

  openMessageModal(messages: string[]): void {
    const modalRef = this.modalService.open(MessageModalComponent, {
      backdrop: 'static',
      windowClass: 'large-width',
      keyboard: false,
    });
    modalRef.componentInstance.title = 'New messages';
    modalRef.componentInstance.messages = messages;
    // modalRef.componentInstance.showConfirmationButton = false;
    modalRef.result.then(
      (confirmed) => {},
      (dismissed) => {}
    );
  }
}
