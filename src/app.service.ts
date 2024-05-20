import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

export interface ScrapedContent {
  cards: string[];
}

@Injectable()
export class AppService {
  getScrapingGift() {
    return this.checkForChanges();
  }

  async checkForChanges(): Promise<ScrapedContent | null> {
    const url = 'https://regalos.bitel.com.pe/';
    const currentContent = await this.fetchPageContent(url);
    return currentContent;
  }

  async fetchPageContent(url: string): Promise<ScrapedContent> {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const cards: string[] = [];
    $('.card').each((index, element) => {
      cards.push($(element).html());
    });

    return { cards: cards };
  }
}
