FROM node:18-alpine AS builder

ARG REACT_APP_CLERK_PUBLISHABLE_KEY
ENV REACT_APP_CLERK_PUBLISHABLE_KEY=$REACT_APP_CLERK_PUBLISHABLE_KEY

WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install --production

COPY . .
RUN yarn build

FROM nginx:alpine

ARG REACT_APP_CLERK_PUBLISHABLE_KEY
ENV REACT_APP_CLERK_PUBLISHABLE_KEY=$REACT_APP_CLERK_PUBLISHABLE_KEY

COPY ./etc/default.nginx /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
