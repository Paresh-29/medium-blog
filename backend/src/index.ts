import { Hono } from 'hono'
import { userRouter } from './routes/user.route';
import { blogRouter } from './routes/blog.route';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string;
  }
}>();


app.use(
  '/*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization']
  })
);

// Error handling middleware
app.use(async (c, next) => {
  try {
    await next();
  } catch (err) {
    console.error('Error:', err);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});


app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

export default app
