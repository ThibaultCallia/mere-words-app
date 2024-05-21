import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import words from './words';

export const runtime = 'edge';

const app = new Hono().basePath('/api');

const routes = app.route('words', words);

export const GET = handle(app);
export const POST = handle(app);

// Creates end to end type safety:
export type AppType = typeof routes;
