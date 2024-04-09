FROM node:alpine AS builder
WORKDIR /usr/app
COPY package*.json .
# RUN npm install
RUN npm install --omit=dev

COPY . .

RUN npm run build

FROM builder

WORKDIR /usr/app
COPY --from=builder /usr/app/. .

CMD ["npm", "start"]