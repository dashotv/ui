FROM node:18-alpine AS builder

ARG CLERK_KEY
ENV VITE_APP_CLERK_PUBLISHABLE_KEY=$CLERK_KEY

WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install --production

COPY . .
RUN yarn build

####################################################################################################
FROM nginx:alpine

ARG CLERK_KEY
ENV VITE_APP_CLERK_PUBLISHABLE_KEY=$CLERK_KEY

COPY ./etc/default.nginx /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
