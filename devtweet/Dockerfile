FROM node:18

WORKDIR /usr/src/app


COPY . .
RUN npm install --production
RUN npm run Build
CMD ["npm", "run"]