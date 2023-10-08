FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install --production

COPY . .
RUN yarn build

ARG REACT_APP_CLERK_PUBLISHABLE_KEY
ENV REACT_APP_CLERK_PUBLISHABLE_KEY=$REACT_APP_CLERK_PUBLISHABLE_KEY

FROM nginx:alpine

COPY ./etc/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
