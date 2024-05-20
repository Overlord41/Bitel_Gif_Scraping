import { Controller, Get } from '@nestjs/common';
import { ScrapingGiftService } from './scraping-gift.service';

@Controller('scraping-gift')
export class ScrapingGiftController {
  constructor(private readonly scrapingGiftService: ScrapingGiftService) {}

  @Get()
  async checkChanges() {
    const hasChanged = await this.scrapingGiftService.checkForChanges();
    return {
      message: hasChanged ? 'The content has changed!' : 'No changes detected.',
    };
  }
}
