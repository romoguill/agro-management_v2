import { Module } from '@nestjs/common';
import { MarketDataController } from './market-data.controller';

@Module({
  controllers: [MarketDataController],
  providers: [],
  exports: [],
})
export class MarketDataModule {}
