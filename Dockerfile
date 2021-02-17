FROM node:lts-alpine

ENV MODE=server

WORKDIR /usr/src/nnsc

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn compile

EXPOSE 1337

CMD [ "sh", "-c", "node out/index.js ${MODE}" ]

# docker build -t razermoon/nnsc .
# docker run --rm -p 1337:1337 --env IP_ADDRESS=0.0.0.0 --env MODE=server -d razermoon/nnsc