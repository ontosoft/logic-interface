FROM node:10.15.3   
RUN mkdir -p /usr/src/logicinterface
COPY build /usr/src/logicinterface/build

COPY server.js /usr/src/logicinterface/
COPY deploy-package.json /usr/src/logicinterface/package.json
COPY src/first-example.owl /usr/src/logicinterface/


WORKDIR /usr/src/logicinterface

RUN echo 'package-lock=false' >> .npmrc

RUN npm install

EXPOSE 80

CMD ["node", "first-example.owl", "server.js", "80"]
