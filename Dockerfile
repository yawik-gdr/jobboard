FROM nginx:latest
COPY ./dist/ssr/www /usr/share/nginx/html
COPY ./dist/ssr/www/offline.html /usr/share/nginx/html/index.html
COPY ./default.conf /etc/nginx/conf.d/default.conf
