# build stage
FROM node:14.19.0-alpine3.14 as build-stage
ARG VUE_APP_DEFAULT_AUTH=""
ARG VUE_APP_APIKEY=""
ARG VUE_APP_AUTHDOMAIN=""
ARG VUE_APP_DATABASEURL=""
ARG VUE_APP_PROJECTId=""
ARG VUE_APP_STORAGEBUCKET=""
ARG VUE_APP_MESSAGINGSENDERID=""
ARG VUE_APP_APPId=""
ARG VUE_APP_MEASUREMENTID=""
WORKDIR /
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn generate

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /dist /usr/share/nginx/html
RUN mkdir /usr/share/nginx/log
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
