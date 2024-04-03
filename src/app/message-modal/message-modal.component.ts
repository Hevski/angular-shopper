import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css'],
})
export class MessageModalComponent {
  @Input() messages!: string[];
  @Input() title!: string;
}
