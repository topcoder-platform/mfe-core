# Use the base image with Node.js
FROM node:latest

ARG APPMODE
ARG APPENV

ENV APPMODE=$APPMODE
ENV APPENV=$APPENV

# Copy the current directory into the Docker image
COPY . /micro-frontends-frame

# Set working directory for future use
WORKDIR /micro-frontends-frame

# Install the dependencies from package.json
RUN npm install

RUN npm build

CMD npm start
