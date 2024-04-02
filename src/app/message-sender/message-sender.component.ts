import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-message-sender',
  templateUrl: './message-sender.component.html',
  styleUrls: ['./message-sender.component.css'],
})
export class MessageSenderComponent {
  message: string = '';
  @Output() messageSend = new EventEmitter<string>();

  sendMessage(): void {
    if (this.message.trim()) {
      this.messageSend.emit(this.message);
      this.message = '';
    }
  }
}
