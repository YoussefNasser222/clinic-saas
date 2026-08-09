// api/index.ts
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from '../src/app.module';
import { VercelRequest, VercelResponse } from '@vercel/node';

const server = express();

let cachedApp: any;

async function bootstrap() {
  if (!cachedApp) {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
    );
    app.init();
    cachedApp = server;
  }
  return cachedApp;
}

export default async (req: VercelRequest, res: VercelResponse) => {
  const app = await bootstrap();
  app(req, res);
};