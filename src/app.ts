import express from 'express';
import config from './config.ts';
import cors from 'cors';
import { deserializeUser } from './middleware/deserializeUser.ts';
import routes from './routes/index.ts';
import logger from './utils/logger.ts';
import connect from './utils/connect.ts';

const { port, clientUrl } = config;
const app = express();

app.use(
  cors({
    origin: clientUrl,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-refresh'],
  })
);

app.use(express.json());
app.use(deserializeUser);

app.get('/healthcheck', (_req, res) => {
  res.sendStatus(200);
});

app.use('/api', routes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

app.listen(port, async () => {
  logger.info(`App is running at http:localhost:${port}`);
  await connect();
});
