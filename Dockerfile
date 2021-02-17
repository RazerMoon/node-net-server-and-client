FROM node:lts-alpine

ENV MODE=server

EXPOSE 1337

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY package.json yarn.lock ./

RUN yarn install --production

COPY . .

RUN yarn compile

CMD [ "sh", "-c", "node out/index.js ${MODE}" ]

# docker build -t razermoon/nnsc .
# docker run --rm -p 1337:1337 --env IP_ADDRESS=0.0.0.0 --env MODE=server -d razermoon/nnsc
