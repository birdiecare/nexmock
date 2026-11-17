import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => app.close());

  it('/sms/json (POST) accepts a message', () => {
    return request(app.getHttpServer())
      .post('/sms/json')
      .send({ api_key: 'key', from: 'Birdie', to: '447700900000', text: 'hi' })
      .expect(201)
      .expect(res => expect(res.body['message-count']).toBe(1));
  });

  it('/list (GET) requires basic auth', () => {
    return request(app.getHttpServer())
      .get('/list')
      .expect(401);
  });
});
