# Stage 1: deps — install production + dev dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: builder — build the Next.js app
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 3: runner — minimal production image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone server
COPY --from=builder /app/.next/standalone ./
# Copy static assets (required — standalone does NOT include these)
COPY --from=builder /app/.next/static ./.next/static
# Copy public directory (images, blog assets, OG images, admin CMS)
COPY --from=builder /app/public ./public
# Copy content directory (blog markdown files)
COPY --from=builder /app/content ./content

USER nextjs

EXPOSE 8080

CMD ["node", "server.js"]
