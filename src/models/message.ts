export default class SmsMessage {
    timestamp: string;
    text: string;
    from: string;
    to: string;

    constructor(to: string, from: string, text: string, timestamp: string) {
        this.timestamp = timestamp;
        this.text = text;
        this.from = from;
        this.to = to;
    }
  }
