import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('transcript')
  async getTranscript(@Query('videoId') videoId: string): Promise<string> {
    return this.appService.getTranscript(videoId);
  }
  @Get('ask')
  async askWithVideoContext(@Query('videoId') videoId: string, @Query('question') question: string): Promise<string> {
    return this.appService.askWithVideoContext(videoId, question);
  }
}