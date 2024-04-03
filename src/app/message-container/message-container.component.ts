import { Component, Input, inject } from '@angular/core';
import { MessageServiceService } from '../message-service.service';

@Component({
  selector: 'app-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.css'],
})
export class MessageContainerComponent {
  @Input() isAdmin: boolean = false;
  private readonly messageService = inject(MessageServiceService);
  readonly messages$ = this.messageService.messages$;
}
