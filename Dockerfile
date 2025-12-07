FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
COPY package.json bun.lock* ./
RUN bun install --production

# Copy source code
COPY ./src ./src
COPY ./tsconfig.json ./tsconfig.json

# Environment variables will be passed from docker-compose
# ENV NODE_ENV=production is optional if handled by docker-compose

EXPOSE 8000

CMD ["bun", "src/index.ts"]
