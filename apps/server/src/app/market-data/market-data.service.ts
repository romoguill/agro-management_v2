import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CreateMarketDatumDto } from './dto/create-market-datum.dto';
import { UpdateMarketDatumDto } from './dto/update-market-datum.dto';
import axios from 'axios';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MarketDataService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async findByToken(query: any) {
    const searchParams = new URLSearchParams(query);
    ('https://apicem.matbarofex.com.ar/api/v2/closing-prices?segment=Agropecuario&type=FUT&excludeEmptyVol=true&from=2024-05-30&to=2024-05-30&page=1&pageSize=50&sortDir=ASC&market=ROFX');

    try {
      const url = this.configService.getOrThrow<string>(
        'MARKET_DATA_API_FUTURES'
      );
      const response = await this.httpService.axiosRef.get(
        `${url}&${searchParams.toString()}`
      );
      return response.data;
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  }
}
