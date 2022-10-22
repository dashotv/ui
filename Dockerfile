FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install --production

COPY . .
RUN yarn build

FROM nginx:alpine

COPY ./etc/nginx.conf /etc/nginx/nginx.conf
COPY ./etc/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html
