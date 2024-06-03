import { ConfigService } from '@nestjs/config';
import { PgDatabase } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './db.schema';

export const DbProvider = 'DB_ORM';

export const dbProvider = {
  provide: DbProvider,
  useFactory: async (config: ConfigService) => {
    const postgres = new Pool(config.getOrThrow('DATABASE_URL'));
    return drizzle(postgres, { schema });
  },
  exports: [DbProvider],
};
