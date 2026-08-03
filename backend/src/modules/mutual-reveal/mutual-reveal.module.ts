import { Module } from '@nestjs/common';
import { MutualRevealController } from './mutual-reveal.controller';

@Module({
  controllers: [MutualRevealController],
})
export class MutualRevealModule {}
