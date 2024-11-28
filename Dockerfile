FROM node:20-alpine AS base

WORKDIR /app  

COPY package*.json ./  

RUN npm i --legacy-peer-deps

COPY . .  

RUN npm run build  

EXPOSE 3000

CMD ["npm", "start"]  