
FROM node:20-alpine

WORKDIR /app

# copy package.json - deps
COPY package*.json ./
# install dependencies
RUN npm install

# copy rest of source code
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
