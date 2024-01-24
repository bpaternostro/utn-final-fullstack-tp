FROM node:lts-alpine3.12 as build

# The /app directory should act as the main application directory
WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "build" ]
