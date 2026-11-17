import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { PricingService } from './pricing.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [PricingService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('stores the SMS it receives', () => {
    const response = appController.sensSms({
      api_key: 'key',
      from: 'Birdie',
      to: '447700900000',
      text: 'hello',
    });

    expect(response['message-count']).toBe(1);
    expect(response.messages[0].to).toBe('447700900000');
    expect(appController.messages).toHaveLength(1);
    expect(appController.messages[0].text).toBe('hello');
  });
});
