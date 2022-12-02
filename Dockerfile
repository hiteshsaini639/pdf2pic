FROM node:16.16.0

# npm@8.15.
RUN npm install -g npm@8.15.1

# Install graphics magick
RUN apt-get update && apt-get install -y graphicsmagick

# Create app directory
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/pdf.input
RUN mkdir -p /usr/src/app/pdf.output
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY index.js /usr/src/app/
COPY pdf.input/ /usr/src/app/pdf.input/

EXPOSE 3000

CMD [ "node", "index.js" ]
