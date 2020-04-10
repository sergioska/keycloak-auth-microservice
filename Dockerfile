FROM node:alpine
WORKDIR /usr/app
COPY package.json .
RUN npm install --quit
COPY . .
RUN npm run build
EXPOSE 3100
ENTRYPOINT [ "node", "lib/app.js" ]

