import {Moment} from 'moment';

export default class SmsMessage {
    timestamp: Moment;
    text: string;
    from: string;
    to: string;

    constructor(to: string, from: string, text: string, timestamp: Moment) {
        this.timestamp = timestamp;
        this.text = text;
        this.from = from;
        this.to = to;
    }
  }
