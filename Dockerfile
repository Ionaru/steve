FROM node:12-alpine as build

## BUILD APP

RUN mkdir /app
WORKDIR /app

# Copy needed build files
COPY ./browserslist ./.npmrc ./package.json ./package-lock.json ./angular.json ./tsconfig.json ./

# Install dependencies
ARG FA_TOKEN
RUN npm ci

# Copy source files
COPY ./src ./src

# Build app for production
ENV NODE_ENV production
ARG STEVE_ENV
RUN npx ng build --configuration=${STEVE_ENV}

## RUN NGINX

FROM nginx:mainline-alpine as serve

COPY ./nginx.conf /etc/nginx/conf.d
RUN rm /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/steve /app
