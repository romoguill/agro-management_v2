import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CreateMarketDatumDto } from './dto/create-market-datum.dto';
import { UpdateMarketDatumDto } from './dto/update-market-datum.dto';
import axios from 'axios';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

@Injectable()
export class MarketDataService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async findByToken(query: any) {
    const baseQuery = {
      segment: 'Agropecuario',
      excludeEmptyVol: true,
      from: dayjs().format('YYYY-MM-DD'),
      to: dayjs().format('YYYY-MM-DD'),
      sortDir: 'ASC',
      market: 'ROFX',
    };

    const finalQuery = {
      ...baseQuery,
      ...query,
    };

    const searchParams = new URLSearchParams(finalQuery);

    const apiURL = new URL(
      this.configService.getOrThrow<string>('MARKET_DATA_API')
    );
    apiURL.search = searchParams.toString();

    return { apiURL };

    // try {
    //   const url = this.configService.getOrThrow<string>(
    //     'MARKET_DATA_API_FUTURES'
    //   );
    //   const response = await this.httpService.axiosRef.get(
    //     `${url}&${searchParams.toString()}`
    //   );
    //   return response.data;
    // } catch (error) {
    //   throw new ServiceUnavailableException(error);
    // }
  }
}
