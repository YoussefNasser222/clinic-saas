// api/index.js
const { NestFactory } = require('@nestjs/core');
const { ExpressAdapter } = require('@nestjs/platform-express');
const express = require('express');
const { AppModule } = require('../dist/app.module');

const server = express();
let cachedAppPromise;

function bootstrap() {
  if (!cachedAppPromise) {
    cachedAppPromise = (async () => {
      const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
      await app.init();
      return server;
    })();
  }
  return cachedAppPromise;
}

module.exports = async (req, res) => {
  const app = await bootstrap();
  app(req, res);
};