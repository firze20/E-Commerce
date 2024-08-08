# Dockerfile for Nginx

FROM nginx:1.27.0

# Copy custom Nginx global configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy custom Nginx server configuration
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Copy built files from frontend build stage
COPY --from=frontend-prod /usr/app/build /usr/share/nginx/html

# Expose the port nginx is running on
EXPOSE 80

# Run nginx on container startup
CMD ["nginx", "-g", "daemon off;"]