import {
  MarketApiQueryDTO,
  MarketDataQueryDTO,
} from '@agro-management-v2/schemas';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import dayjs from 'dayjs';

@Injectable()
export class MarketDataService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async findByToken(query: MarketDataQueryDTO) {
    const baseQuery: Pick<
      MarketApiQueryDTO,
      'segment' | 'excludeEmptyVol' | 'from' | 'to' | 'sortDir' | 'market'
    > = {
      segment: 'Agropecuario',
      excludeEmptyVol: 'true',
      from: dayjs().format('YYYY-MM-DD'),
      to: dayjs().format('YYYY-MM-DD'),
      sortDir: 'ASC',
      market: 'ROFX',
    };

    const finalQuery: MarketApiQueryDTO = {
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
