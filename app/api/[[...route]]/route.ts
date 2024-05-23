import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { cors } from 'hono/cors';
import words from './words';
import users from './users';

export const runtime = 'edge';

const app = new Hono().basePath('/api');

app.use(
  '*',
  cors({
    origin: ['http://172.20.10.2:3000', 'http://localhost:3000'],
    allowMethods: ['GET', 'POST'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);

const routes = app.route('words', words).route('users', users);

export const GET = handle(app);
export const POST = handle(app);

// Creates end to end type safety:
export type AppType = typeof routes;
