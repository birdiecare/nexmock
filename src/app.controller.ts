import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Body,
  Res,
} from "@nestjs/common";
import moment = require("moment");
import SmsMessage from "./models/message";
import { BasicAuthStrategy } from "./security/basicGuard";
import { PricingService } from "./pricing.service";

interface SmsRequestBody {
  api_key: string;
  api_secret?: string;
  from: string;
  to: string;
  text?: string;
}

function parseMessage(message: SmsMessage) {
  return {
    ...message,
    timestamp: message.timestamp.fromNow(),
  };
}

@Controller()
export class AppController {
  messages: SmsMessage[];
  startTime: moment.Moment;

  constructor(private readonly pricingService: PricingService) {
    this.messages = [];
    this.startTime = moment();
  }

  @UseGuards(new BasicAuthStrategy())
  @Get("list")
  async list(@Res() res) {
    const amountSaved = this.messages
      .reduce(
        (sum, message) => sum + this.pricingService.getPrice(message.to),
        0.0
      )
      .toFixed(2);
    return res.render("list", {
      messages: this.messages
        .sort(
          (msgA, msgB) => msgB.timestamp.valueOf() - msgA.timestamp.valueOf()
        )
        .map(parseMessage),
      amountSaved,
      restartedSince: this.startTime.fromNow(),
    });
  }

  @UseGuards(new BasicAuthStrategy())
  @Get("details/:messageId")
  async details(@Param("messageId") messageId: string, @Res() res) {
    return res.render("details", {
      message: this.messages[JSON.parse(messageId)],
    });
  }

  @Post("/sms/json")
  sensSms(@Body() body: SmsRequestBody) {
    const message = new SmsMessage(body.to, body.from, body.text, moment());
    this.messages.push(message);

    return {
      "message-count": 1,
      messages: [
        {
          to: body.to,
          "message-id": Math.round(Math.random() * 10000),
          status: "0",
        },
      ],
    };
  }
}
