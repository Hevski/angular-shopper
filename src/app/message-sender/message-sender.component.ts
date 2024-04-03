import { Component, EventEmitter, Output, inject } from '@angular/core';
import { SnackbarService } from '../Utils/snackbar.service';

@Component({
  selector: 'app-message-sender',
  templateUrl: './message-sender.component.html',
  styleUrls: ['./message-sender.component.css'],
})
export class MessageSenderComponent {
  message: string = '';
  @Output() messageSend = new EventEmitter<string>();
  private readonly snackbar = inject(SnackbarService);

  sendMessage(): void {
    if (this.message.trim()) {
      this.messageSend.emit(this.message);
      this.snackbar.onSuccess('Message sent to admin', 'success-snackbar');
      this.message = '';
    }
  }
}
