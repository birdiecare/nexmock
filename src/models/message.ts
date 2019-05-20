export default class SmsMessage {
    constructor(private to: string, private from: string, private text: string, private timestamp: string) {}
  };