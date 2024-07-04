FROM node:18-alpine AS builder

ARG GITHUB_TOKEN
ARG CLERK_KEY
ARG VITE_APP_APM_SERVER_URL
ENV VITE_APP_CLERK_PUBLISHABLE_KEY=$CLERK_KEY
ENV GITHUB_TOKEN=$GITHUB_TOKEN
ENV VITE_APP_APM_SERVER_URL=$VITE_APP_APM_SERVER_URL

WORKDIR /app
COPY package*.json yarn.lock .yarn .npmrc ./
COPY .yarnrc.docker.yml .yarnrc.yml
RUN yarn set version stable
RUN yarn -v
RUN --mount=type=cache,target=/app/node_modules yarn install

COPY . .
RUN --mount=type=cache,target=/app/node_modules yarn build

####################################################################################################
FROM nginx:alpine

COPY ./etc/default.nginx /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
