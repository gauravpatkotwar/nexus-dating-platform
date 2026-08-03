FROM nginx:1.27-alpine

# Copy custom Nginx Gateway configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose HTTP port 80 and HTTPS port 443
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
