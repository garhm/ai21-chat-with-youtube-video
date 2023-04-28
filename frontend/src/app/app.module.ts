import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from './components/message/message.component';
import { ChatComponent } from './components/chat/chat.component';

@NgModule({
  declarations: [AppComponent, MessageComponent, ChatComponent],
  imports: [
    BrowserModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
