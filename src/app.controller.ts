import { Controller, Post, Query, Get, Render, Param, UseGuards } from '@nestjs/common';
import moment = require('moment');
import SmsMessage from './models/message';
import { BasicAuthStrategy } from './security/basicGuard';

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

  constructor() {
    this.messages = [];
  }

  @UseGuards(new BasicAuthStrategy())
  @Get('list')
  @Render('list')
  async list() {
    return {
      messages: this.messages
          .sort((msgA, msgB) => msgB.timestamp.valueOf() - msgA.timestamp.valueOf())
          .map(parseMessage),
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
