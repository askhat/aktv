FROM node:alpine as builder

WORKDIR /tmp
ADD . ./
RUN npm install --silent

FROM abiosoft/caddy
WORKDIR /app

COPY --from=builder /tmp .
EXPOSE 2015

CMD caddy
