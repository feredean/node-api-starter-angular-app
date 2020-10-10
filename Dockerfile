FROM node:12-alpine as builder

WORKDIR /app

COPY . . 

RUN npm ci
RUN npm run build


FROM nginx

WORKDIR /
COPY --from=builder /app/dist/node-api-starter-app  /usr/share/nginx/html
COPY --from=builder /app/.kubernetes/default.conf /etc/nginx/conf.d/default.conf
