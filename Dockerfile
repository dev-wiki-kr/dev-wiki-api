FROM node:18-alpine AS dependencies

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

FROM node:18-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

RUN pnpm build

FROM node:18-alpine AS runner

WORKDIR /app

COPY .env.development ./
COPY .env.production ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

EXPOSE 3000

CMD ["node", "dist/main"]
