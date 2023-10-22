FROM node:18-alpine AS builder

ARG VITE_APP_CLERK_PUBLISHABLE_KEY
ENV VITE_APP_CLERK_PUBLISHABLE_KEY=$VITE_APP_CLERK_PUBLISHABLE_KEY

WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install --production

COPY . .
RUN yarn build

####################################################################################################
FROM nginx:alpine

ARG VITE_APP_CLERK_PUBLISHABLE_KEY
ENV VITE_APP_CLERK_PUBLISHABLE_KEY=$VITE_APP_CLERK_PUBLISHABLE_KEY

COPY ./etc/default.nginx /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
