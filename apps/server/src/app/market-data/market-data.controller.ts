import { MarketDataQueryDTO } from '@agro-management-v2/schemas';
import { Controller, Get, Query } from '@nestjs/common';
import { MarketDataService } from './market-data.service';

@Controller('market-data')
export class MarketDataController {
  constructor(private readonly marketDataService: MarketDataService) {}

  @Get()
  findByToken(@Query() query: MarketDataQueryDTO) {
    return this.marketDataService.findByToken(query);
  }
}
