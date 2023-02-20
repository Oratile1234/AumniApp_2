FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /app
#COPY ["package.json", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../

COPY . .
RUN npm i -g @angular/cli@13.3.7

RUN npm install
RUN npm run build
RUN rm -rf /usr/src/app/src
RUN rm -rf /usr/src/app/node_modules

EXPOSE 4545
# RUN chown -R node /usr/src/app
# USER node
CMD ["npm", "run", "start"]
