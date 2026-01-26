FROM node:20-alpine AS build
WORKDIR /app

# Use repo root as build context via compose; copy front-end and root env
COPY front-end/package*.json ./
RUN npm ci
COPY front-end ./
COPY .env.frontend ./.env.frontend
RUN npm run build

FROM nginx:1.25-alpine AS web
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
