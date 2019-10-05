FROM nginx
COPY dist/node-api-starter-app /usr/share/nginx/html
COPY .kubernetes/default.conf /etc/nginx/conf.d/default.conf
