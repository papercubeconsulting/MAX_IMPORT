FROM node:10

#data
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .

ENV PORT 8080
EXPOSE 8080

# Building app
RUN npm run build

# Running the app
CMD [ "npm", "run","start" ]