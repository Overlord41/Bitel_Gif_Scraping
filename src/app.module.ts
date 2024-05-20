import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ScrapingGiftModule } from './scraping-gift/scraping-gift.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que el módulo de configuración sea global
    }),
    ScheduleModule.forRoot(),
    ScrapingGiftModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
