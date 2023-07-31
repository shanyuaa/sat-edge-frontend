FROM node:20 as builder

WORKDIR /app

COPY . .

RUN npm install --registry=https://registry.npmjs.org/ && npm run build

FROM nginx:stable-alpine3.17

COPY --from=builder /app/dist /usr/share/nginx/html

RUN chmod -R 777 /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
