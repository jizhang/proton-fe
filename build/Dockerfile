FROM nginx:1.17-alpine

ENV TZ "Asia/Shanghai"

COPY build/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY dist/ /app/
