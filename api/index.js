// api/index.js
require('module-alias/register')
const { NestFactory } = require('@nestjs/core');
const { ExpressAdapter } = require('@nestjs/platform-express');
const express = require('express');
const { AppModule } = require('../dist/app.module');

const server = express();
let cachedApp;

async function bootstrap() {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    await app.init();
    cachedApp = server;
  }
  return cachedApp;
}

module.exports = async (req, res) => {
  const app = await bootstrap();
  app(req, res);
};