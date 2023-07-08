FROM node:lts-alpine AS backend

ENV NODE_ENV=development

WORKDIR /usr/src/backend

RUN yarn global add nodemon

COPY package.json yarn.lock ./

RUN --mount=type=cache,target=/root/.yarn \
    YARN_CACHE_FOLDER=/root/.yarn yarn install

EXPOSE 3080

CMD ["yarn", "dev"]
