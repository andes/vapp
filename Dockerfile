
ARG NODE_VERSION=8.9-alpine
ARG ENVIRONMENT=production

# API Build
FROM andesnqn/api as api
RUN tsc

# APP Build
FROM andesnqn/app as app 
RUN if [ "$ENVIRONMENT" = "production" ] ; then npm run ng -- build --prod; else  npm run ng -- build --env=test --aot=false; fi

FROM node:${NODE_VERSION}

RUN npm install -g typescript nodemon

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

EXPOSE 80

CMD [ "node", "index.js"]

