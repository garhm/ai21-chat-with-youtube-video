import { Component } from '@angular/core';
import { IMessage } from './core/models/message.interface';
import { MessageTypeEnum } from './core/models/message-type.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  videoId = '';
  isLoading: boolean = false;
  question = '';
  messages: IMessage[] = [{
    type: MessageTypeEnum.user,
    text: 'What is it about?'
  },
    { type: MessageTypeEnum.agent, text: 'It is about a dog' }]

  async askWithVideoContext() {
    this.isLoading = true;
    if (!this.videoId) {
      alert('Please enter a video ID');
      return;
    }
    this.messages.push(
      {
        type: MessageTypeEnum.user,
        text: this.question
      }
    );
    try {
      const response = await fetch(
        `http://localhost:3000/ask?videoId=${this.videoId}&question=${this.question}`
      );
      const answer = await response.text();
      this.messages.push(
        {
          type: MessageTypeEnum.agent,
          text: answer
        }
      );
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error('Error fetching answer:', error);
      alert('Error fetching answer. Please check the console for details.');
    }
  }
}
