import { Component } from '@angular/core';
import { IMessage } from './core/models/message.interface';
import { MessageTypeEnum } from './core/models/message-type.enum';
import { environment }  from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  videoUrl = '';
  isLoading: boolean = false;
  question = '';
  messages: IMessage[] = [];
  apiUrl = environment.api;
  async askWithVideoContext() {
    this.isLoading = true;
    if (!this.videoUrl || !this.question) {
      alert('Please enter a video ID');
      return;
    }
    const videoId = this.videoUrl.split('v=')[1];
    this.messages.push(
      {
        type: MessageTypeEnum.user,
        text: this.question
      }
    );
    this.question = '';
    try {
      const response = await fetch(
        `${this.apiUrl}/ask?videoId=${videoId}&question=${this.question}`
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
