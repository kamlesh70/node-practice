FROM node:18

WORKDIR /app

COPY . . 

RUN npm ci
RUN npm run build

EXPOSE 8000

CMD [ "npm", "dist/index.js" ]

