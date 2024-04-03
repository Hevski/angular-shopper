import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageServiceService {
  messagesSource = new BehaviorSubject<string[]>([]);
  public messages$ = this.messagesSource.asObservable();

  constructor() {}
}
