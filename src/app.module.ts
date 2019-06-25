import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PricingService } from './pricing.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PricingService],
})
export class AppModule {}
