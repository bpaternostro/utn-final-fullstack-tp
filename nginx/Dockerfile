FROM nginx:1.19.0-alpine

RUN apt-get update && \
    apt-get install -y openssl && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir /etc/nginx/html/static/admin
COPY ./default.conf /etc/nginx/conf.d/default.conf

# Expose ports 80 and 443
EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]