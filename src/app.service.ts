import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

export interface ScrapedContent {
  cards: ScrapedCard[];
}

interface ScrapedCard {
  Nombre: string;
  Monedas: string;
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

    const cards: ScrapedCard[] = [];
    $('.portfolio').each((index, element) => {
      if ($(element).find('.sold-out').length === 0) {
        $(element)
          .find('.card')
          .each((cardIndex, cardElement) => {
            const nombre =
              $(cardElement).find('img.card-img').attr('alt') || '';
            const monedas = $(cardElement).find('strong').text();
            cards.push({ Nombre: nombre, Monedas: monedas });
          });
        // cards.push($(element).html());
      }
    });

    return { cards: cards };
  }
}
