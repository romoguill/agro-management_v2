import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarketDataModule } from '@agro-management-v2/market-data';

@Module({
  imports: [MarketDataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
