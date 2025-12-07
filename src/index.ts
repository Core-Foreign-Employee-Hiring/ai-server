import { Elysia } from 'elysia';
import { openapi } from '@elysiajs/openapi';
import { cors } from '@elysiajs/cors';
import { analysis } from './modules/analysis';

const app = new Elysia()
  .use(cors())
  .use(
    openapi({
      documentation: {
        info: {
          title: 'Korfit AI Server API',
          version: '0.1.0',
        },
        tags: [{ name: 'Analysis', description: '스펙 분석 관련 API' }],
      },
      path: '/openapi',
    })
  )
  .use(analysis)
  .listen({
    port: 8000,
    hostname: '0.0.0.0',
  });

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
console.log(
  `📚 Swagger/Scalar documentation is available at http://${app.server?.hostname}:${app.server?.port}/openapi`
);
