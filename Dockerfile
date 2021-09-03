FROM node:12

WORKDIR usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

# RUN npm run local

CMD ["npm", "run", "local"]
