import { Module } from '@nestjs/common';
import { dbProvider } from './db.provider';

@Module({
  providers: [dbProvider],
})
export class DbModule {}
