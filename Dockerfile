FROM node:alpine as builder

WORKDIR /tmp
ADD . ./
RUN ["npm", "install", "--silent"]
RUN ["npm", "run", "build"]

FROM nginx:alpine as server
WORKDIR /usr/share/nginx/html

COPY --from=builder /tmp/dist .
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
