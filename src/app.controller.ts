import { Controller, Post, Query, Get, Render, Param, UseGuards } from '@nestjs/common';
import moment = require('moment');
import SmsMessage from './models/message';
import { BasicAuthStrategy } from './security/basicGuard';
import { PricingService } from './pricing.service';

interface SmsRequestQuery {
  api_key: string;
  api_secret?: string;
  from: string;
  to: string;
  text?: string;
}

function parseMessage(message: SmsMessage) {
  return  {
    ...message,
    timestamp: message.timestamp.fromNow(),
  };
}

@Controller()
export class AppController {
  messages: SmsMessage[];
  startTime: moment.Moment;

  constructor(
    private readonly pricingService: PricingService,
  ) {
    this.messages = [];
    this.startTime = moment();
  }

  @UseGuards(new BasicAuthStrategy())
  @Get('list')
  @Render('list')
  async list() {
    const amountSaved = this.messages.reduce((sum, message) => sum + this.pricingService.getPrice(message.to), 0.0).toFixed(2);
    return {
      messages: this.messages
          .sort((msgA, msgB) => msgB.timestamp.valueOf() - msgA.timestamp.valueOf())
          .map(parseMessage),
      amountSaved,
      restartedSince: this.startTime.fromNow(),
    };
  }

  @UseGuards(new BasicAuthStrategy())
  @Get('details/:messageId')
  @Render('details')
  async details(
    @Param('messageId') messageId: string,
  ) {
    return {
      message: this.messages[JSON.parse(messageId)],
    };
  }

  @Post('/sms/json')
  sensSms(
    @Query() query: SmsRequestQuery,
  ) {
    const message = new SmsMessage(
      query.to, query.from, query.text, moment());
    this.messages.push(message);

    return {
      'message-count': 1,
      'messages': [
        {
          'to': query.to,
          'message-id': Math.round(Math.random() * 10000),
          'status': '0',
        },
      ],
    };
  }
}
