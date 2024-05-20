import { Module } from '@nestjs/common';
import { ScrapingGiftService } from './scraping-gift.service';
import { ScrapingGiftController } from './scraping-gift.controller';
import { TwilioService } from './twilio.service';

@Module({
  controllers: [ScrapingGiftController],
  providers: [ScrapingGiftService, TwilioService],
})
export class ScrapingGiftModule {}
