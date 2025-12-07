FROM oven/bun AS build

WORKDIR /app

COPY package.json bun.lock* ./

RUN bun install

COPY ./src ./src
COPY ./tsconfig.json ./tsconfig.json

ENV NODE_ENV=production

RUN bun src/index.ts

EXPOSE 8000