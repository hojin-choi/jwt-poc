import * as config from 'config';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';

const jwt_secret = config.get<string>('jwt_secret');

export async function login(request: express.Request, response: express.Response) {
  const { body } = request;

  const token = jwt.sign({
    email: body.email,
  }, jwt_secret, {
      expiresIn: '5m',
    });

  response.status(200);
  response.header({ 'Content-Type': 'application/json' });
  response.send(JSON.stringify({
    token,
  }));
}