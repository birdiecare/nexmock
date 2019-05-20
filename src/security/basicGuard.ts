import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { IncomingMessage, ServerResponse } from 'http';

const username = process.env.NEXMOCK_USERNAME || 'username';
const password = process.env.NEXMOCK_PASSWORD || 'changeme';

const requestAuthentication = (response: ServerResponse) => {
  response.setHeader('WWW-Authenticate', 'Basic realm="My Realm"');

  throw new HttpException('', HttpStatus.UNAUTHORIZED);
};

@Injectable()
export class BasicAuthStrategy implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: IncomingMessage = context.switchToHttp().getRequest();
    const response: ServerResponse = context.switchToHttp().getResponse();

    const { authorization } = request.headers;

    if (!authorization) {
      return requestAuthentication(response);
    }

    const parts = authorization.split(' ');
    if (parts.length < 2) {
      return requestAuthentication(response);
    }

    const scheme = parts[0];
    const credentials = new Buffer(parts[1], 'base64').toString().split(':');

    if (!/Basic/i.test(scheme)) {
      return requestAuthentication(response);
    }

    if (credentials.length < 2) {
      return requestAuthentication(response);
    }

    const username = credentials[0];
    const password = credentials[1];
    if (!username || !password) {
      return requestAuthentication(response);
    }

    if (username === username && password === password) {
      return true;
    }

    return requestAuthentication(response);
  }
}
