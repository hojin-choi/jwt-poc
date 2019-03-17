import * as config from 'config';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';

const jwt_secret = config.get<string>('jwt_secret');

export async function api(request: express.Request, response: express.Response) {
  const { headers } = request;
  const token = headers['x-access-token'] as string;
  if (!token) {
    response.status(401);
    response.send(JSON.stringify({
      message: 'token required',
    }));
    return;
  }

  try {
    const token_obj = jwt.verify(token, jwt_secret);
    response.status(200);
    response.header({ 'Content-Type': 'application/json' });
    response.send(JSON.stringify(token_obj));
  } catch (error) {
    response.status(401);
    response.send(JSON.stringify({
      message: 'token invalid',
    }));
  }



}