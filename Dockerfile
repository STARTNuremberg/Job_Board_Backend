FROM node:lts-alpine AS backend

ENV NODE_ENV=development

WORKDIR /usr/src/

RUN yarn global add nodemon

COPY package.json yarn.lock ./

RUN  yarn install

EXPOSE 3080

CMD ["yarn", "dev"]
