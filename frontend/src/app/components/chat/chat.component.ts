import {Component, Input} from '@angular/core';
import {IMessage} from "../../core/models/message.interface";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
 @Input() messages: IMessage[] = [];
 @Input() isTyping: boolean = false;
}
