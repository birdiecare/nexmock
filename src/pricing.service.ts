import { Injectable } from '@nestjs/common';
import { prices } from './constants/prices';

@Injectable()
export class PricingService {

  getPrice(phoneNumber?: string): number {
    if (!phoneNumber) {
      return 0;
    }
    
    const prefixes = Object.keys(prices);
    const prefix = prefixes.find(p => phoneNumber.startsWith(p));
    return prices[prefix];
  }
}