import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MarketDataService } from './market-data.service';
import { CreateMarketDatumDto } from './dto/create-market-datum.dto';
import { UpdateMarketDatumDto } from './dto/update-market-datum.dto';

@Controller('market-data')
export class MarketDataController {
  constructor(private readonly marketDataService: MarketDataService) {}

  @Get()
  findByToken(@Query() query: any) {
    return this.marketDataService.findByToken(query);
  }
}
