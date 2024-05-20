import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { Cron } from '@nestjs/schedule';
import { TwilioService } from './twilio.service';

@Injectable()
export class ScrapingGiftService {
  private lastContent = '';

  constructor(private readonly twilioService: TwilioService) {}

  @Cron('*/15 * * * *')
  async handleCron() {
    console.log('Checking for changes...');
    const changedContent = await this.checkForChanges();
    if (changedContent) {
      console.log('The content has changed!');
      await this.sendNotification(
        `Regalos bitel ha cambiado: Hay nuevos productos disponibles`,
      );
    } else {
      console.log('No changes detected.');
    }
  }

  async fetchPageContent(url: string): Promise<string> {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    return $('body').html();
  }

  async checkForChanges(): Promise<string | null> {
    const url = 'https://regalos.bitel.com.pe/';
    const currentContent = await this.fetchPageContent(url);
    if (this.lastContent && this.lastContent !== currentContent) {
      const changedContent = this.getChangedContent(
        this.lastContent,
        currentContent,
      );
      this.lastContent = currentContent;
      return changedContent;
    }
    this.lastContent = currentContent;
    return null;
  }

  getChangedContent(oldContent: string, newContent: string): string {
    // Aquí puedes implementar una lógica más compleja para detectar los cambios
    // Por simplicidad, este ejemplo asume que todo el contenido ha cambiado
    return newContent;
  }

  async sendNotification(message: string) {
    console.log('Sending notification:', message);
    // Reemplaza '+1234567890' con el número de teléfono al que deseas enviar el mensaje
    await this.twilioService.sendMessage(
      process.env.PHONE_NUMBER_CLIENT,
      message,
    );
  }
}
