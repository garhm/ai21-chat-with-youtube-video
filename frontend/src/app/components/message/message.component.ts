import { Component, Input } from '@angular/core';
import { IMessage } from '../../core/models/message.interface';
import { MessageTypeEnum } from '../../core/models/message-type.enum';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() message: IMessage = {type: '', text: ''}
  messageTypes = MessageTypeEnum;

  constructor() {
  }

}
