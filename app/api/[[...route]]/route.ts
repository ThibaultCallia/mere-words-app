import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import words from './words';
import users from './users';

export const runtime = 'edge';

const app = new Hono().basePath('/api');

const routes = app.route('words', words).route('users', users);

export const GET = handle(app);
export const POST = handle(app);

// Creates end to end type safety:
export type AppType = typeof routes;
