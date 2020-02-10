FROM node:10.9.0
WORKDIR /var/code
ENV PATH /var/code/node_modules/.bin:$PATH
COPY . /var/code
RUN npm install --production && npm install -g @angular/cli@8.0.0
CMD ng serve --host 0.0.0.0
