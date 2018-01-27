FROM node:9.4.0-alpine

ARG APP_NAME
ENV NODE_ENV=production

COPY dist /app
COPY package.json /app
WORKDIR /app
RUN npm install -g

CMD ["node", "server.jsx"]
