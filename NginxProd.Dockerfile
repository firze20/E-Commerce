# Dockerfile for Production Nginx

FROM nginx:1.27.0

# Copy custom Nginx global configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy custom Nginx server configuration
COPY nginx/conf.d/prod.conf /etc/nginx/conf.d/default.conf

# Copy the built frontend files from the local ecommerce-frontend-prod image
COPY --from=ecommerce-frontend-prod:latest /usr/app/dist /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]