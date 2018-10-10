
ARG NODE_VERSION=8-alpine
ARG API_VERSION=master
ARG APP_VERSION=master

# API Build
FROM andesnqn/api:$API_VERSION as api
RUN npm run tsc

# APP Build
FROM andesnqn/app:$APP_VERSION as app 
ARG ENVIRONMENT=production
RUN if [ "$ENVIRONMENT" = "production" ] ; then npm run build:prod; else  npm run build:test; fi

FROM node:${NODE_VERSION}

WORKDIR /usr/src/andes/

# Copy ANDES Apps to the container
RUN mkdir -p api
RUN mkdir -p app/dist
COPY --from=app /usr/src/app/dist ./app/dist
COPY --from=api /usr/src/api ./api

WORKDIR /usr/src/andes/vapp

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Hack
RUN npm run tsc || true

EXPOSE 80

CMD [ "node", "index.js"]

