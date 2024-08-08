# Dockerfile for Nginx

FROM nginx:1.27.0

# Copy custom Nginx global configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy custom Nginx server configuration
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf