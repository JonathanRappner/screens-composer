FROM nginx:alpine

COPY ./config/default.conf /etc/nginx/conf.d/default.conf
COPY ./config/screens.conf /etc/nginx/templates/screens.conf.template
COPY ./config/static.conf /etc/nginx/templates/static.conf.template
COPY ./config/api.conf /etc/nginx/templates/api.conf.template