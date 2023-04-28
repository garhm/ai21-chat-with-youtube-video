import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { YoutubeTranscript } from 'youtube-transcript';
import { A21Service } from './A21.service';

@Injectable()
export class AppService {
  private readonly apiKey: string;
  private readonly redis: Redis;

  constructor(private configService: ConfigService,
              private readonly a21Service: A21Service) {
    this.apiKey = this.configService.get('YOUTUBE_API_KEY');
    this.redis = new Redis(this.configService.get('REDIS_URL'));
  }

  async getTranscript(videoId: string): Promise<string> {
    const cachedTranscript = await this.redis.get(`transcript:${videoId}`);
    if (cachedTranscript) {
      return cachedTranscript;
    }

    const transcriptResponse = await YoutubeTranscript.fetchTranscript(videoId, {lang: 'en', country: 'US'});
    let transcript = '';
    transcriptResponse.forEach((transcriptItem) => {
      transcript += transcriptItem.text + ' ';
    });

    // Retrieve and cache the transcript from the YouTube API
    await this.redis.set(`transcript:${videoId}`, transcript, 'EX', 3600);
    return transcript;
  }

  async askWithVideoContext(videoId: string, question: string) {
    let context = await this.getTranscript(videoId);
    if (context.length > 15000) {
      let summaries: string = '';
      let segmentResponse: any;
      segmentResponse = await this.a21Service.makeRequest('post', 'segmentation', this.configService.get('A21_API_KEY'), {
        source: context,
        sourceType: 'TEXT'
      });
      for (const segment of segmentResponse.data.segments) {
        if (segment.segmentText.length > 500) {
        const resp = await this.a21Service.makeRequest('post', 'summarize', this.configService.get('A21_API_KEY'), {source: segment.segmentText, sourceType: 'TEXT'});
        summaries += resp.data.text;
        } else {
          summaries += segment.segmentText;
        }
      }
      context = summaries;
    }
      const response = await this.a21Service.makeRequest('post', 'experimental/answer', this.configService.get('A21_API_KEY'), {context, question: question})
      return response.data.answer
  }
}
