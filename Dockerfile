FROM --platform=arm64 node:18.12.1

#--> Aasi genera la imagen de acuerdo a la arquitectura del pc donde se genera

# Asi se genera la imagen para diferentes arquitecturas usando docker buildx
#FROM --platform=$BUILDPLATFORM node:19.2-alpine3.16
# /app

#cd app
WORKDIR /app
COPY package.json ./

#install dependeces
RUN npm install


FROM node:19.2-alpine3.16 as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# do test
RUN npm run test


FROM node:19.2-alpine3.16 as prod-deps
WORKDIR /app
COPY package.json ./
RUN npm install --prod


FROM node:19.2-alpine3.16 as runner
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY app.js ./
COPY tasks/ ./tasks
CMD ["node", "app.js"]
