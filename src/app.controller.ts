import { Controller, Get } from '@nestjs/common';
import { AppService, ScrapedContent } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('scraping')
  async getScrapingGift(): Promise<ScrapedContent | null> {
    return this.appService.getScrapingGift();
  }
}
