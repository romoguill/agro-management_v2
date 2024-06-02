import { boolean, z } from 'zod';

export class MarketData {
  id: string;
  symbol: string;
  symbolDetail: string;
  date: Date;
}

// ++++++ EXTERNAL API SCHEMAS ++++++

enum symbolAPIEnum {
  SOY_DOLAR = 'SOJ Dolar MATba',
  CORN_DOLAR = 'MAI Dolar MATba',
  WHEAT_DOLAR = 'TRI Dolar MATba',
  SOY_PESO = 'SOJ Pesos MATba',
  CORN_PESO = 'MAI Pesos MATba',
  WHEAT_PESO = 'TRI Pesos MATba',
}

const symbolAPI = z.nativeEnum(symbolAPIEnum);
export type SymbolAPI = z.infer<typeof symbolAPI>;

// TODO: this will change based on the current date: SYMBOL/MMYY. OK for now but must be changed to a mapping function
enum symbolDetailAPIEnum {
  SOY_ROS_JUL_24 = 'SOJ.ROS/JUL24',
  SOY_ROS_AGO_24 = 'SOJ.ROS/AGO24',
  SOY_ROS_SEP_24 = 'SOJ.ROS/SEP24',
  SOY_ROS_OCT_24 = 'SOJ.ROS/OCT24',
  SOY_ROS_NOV_24 = 'SOJ.ROS/NOV24',
  SOY_ROS_DIC_24 = 'SOJ.ROS/DIC24',
  CORN_ROS_JUL_24 = 'MAI.ROS/JUL24',
  CORN_ROS_AGO_24 = 'MAI.ROS/AGO24',
  CORN_ROS_SEP_24 = 'MAI.ROS/SEP24',
  CORN_ROS_OCT_24 = 'MAI.ROS/OCT24',
  CORN_ROS_NOV_24 = 'MAI.ROS/NOV24',
  CORN_ROS_DIC_24 = 'MAI.ROS/DIC24',
  WHEAT_ROS_JUL_24 = 'TRI.ROS/JUL24',
  WHEAT_ROS_AGO_24 = 'TRI.ROS/AGO24',
  WHEAT_ROS_SEP_24 = 'TRI.ROS/SEP24',
  WHEAT_ROS_OCT_24 = 'TRI.ROS/OCT24',
  WHEAT_ROS_NOV_24 = 'TRI.ROS/NOV24',
  WHEAT_ROS_DIC_24 = 'TRI.ROS/DIC24',
}

const symbolDetailAPI = z.nativeEnum(symbolDetailAPIEnum);
export type SymbolDetailAPI = z.infer<typeof symbolDetailAPI>;

export const marketApiQueryDTO = z.object({
  product: symbolAPI,
  underlying: symbolDetailAPI,
  segment: z.literal('Agropecuario'),
  excludeEmptyVol: z.coerce
    .string()
    .refine((val) => val === 'true' || val === 'false'),
  from: z.string().date(),
  to: z.string().date(),
  sortDir: z.union([z.literal('ASC'), z.literal('DESC')]),
  market: z.literal('ROFX'),
});
export type MarketApiQueryDTO = z.infer<typeof marketApiQueryDTO>;

// ++++++ INTERNAL API SCHEMAS ++++++

export const Grain = z.enum(['SOY', 'CORN', 'WHEAT']);
export type Grain = z.infer<typeof Grain>;

export const MarketPlace = z.enum(['ROSARIO', 'CHICAGO']);
export type MarketPlace = z.infer<typeof MarketPlace>;

export const Derivative = z.enum(['FUTURE', 'OPTION']);
export type Derivative = z.infer<typeof Derivative>;

export const MarketDataQueryDTO = z
  .object({
    grain: Grain,
    marketPlace: MarketPlace,
    settlement: z.date(),
    derivative: Derivative,
    from: z.date(),
    to: z.date(),
  })
  .refine((data) => data.from <= data.to);

export type MarketDataQueryDTO = z.infer<typeof MarketDataQueryDTO>;
