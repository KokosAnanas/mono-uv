# --- build stage ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-fund --no-audit
COPY . .
# Прод-сборка. Angular 17+ по умолчанию кладёт сборку в dist/<app>/browser
RUN npm run build -- --configuration=production

# --- runtime stage ---
FROM nginx:1.27-alpine
# Конфиг nginx у нас монтируется docker compose'ом, поэтому копируем только статику
# Кладём браузерную сборку в корень веб-сервера:
# Если у проекта имя 'uvedomlenie', путь будет dist/uvedomlenie/browser; берём маской */browser
COPY --from=build /app/dist/*/browser/ /usr/share/nginx/html/
# Служебные файлы в корень сайта
COPY robots.txt /usr/share/nginx/html/robots.txt
COPY 404.html    /usr/share/nginx/html/404.html
