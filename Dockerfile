FROM node:18-alpine AS builder

ARG GITHUB_TOKEN
ARG CLERK_KEY
ENV VITE_APP_CLERK_PUBLISHABLE_KEY=$CLERK_KEY
ENV GITHUB_TOKEN=$GITHUB_TOKEN

WORKDIR /app
COPY package*.json yarn.lock .yarn .npmrc ./
COPY <<EOF ./.yarnrc.yml
nodeLinker: node-modules
npmScopes:
  dashotv:
    npmAlwaysAuth: true
    npmAuthToken: '${GITHUB_TOKEN:-}'
    npmRegistryServer: "https://npm.pkg.github.com"

npmRegistries:
  "https://npm.pkg.github.com":
    npmAuthToken: '${GITHUB_TOKEN:-}'
    npmAlwaysAuth: true
EOF
RUN yarn set version stable
RUN yarn -v
RUN --mount=type=cache,target=/app/node_modules yarn install

COPY . .
RUN --mount=type=cache,target=/app/node_modules yarn build

####################################################################################################
FROM nginx:alpine

COPY ./etc/default.nginx /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
