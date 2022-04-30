# Use the base image with Node.js
FROM node:10

ARG APPMODE
ARG APPENV
ARG SEGMENT_ANALYTICS_KEY

ENV APPMODE=$APPMODE
ENV APPENV=$APPENV
ENV SEGMENT_ANALYTICS_KEY=$SEGMENT_ANALYTICS_KEY

# Copy the current directory into the Docker image
COPY . /mfe-core

# Set working directory for future use
WORKDIR /mfe-core

# Install the dependencies from package.json
RUN npm install

RUN npm run build

CMD npm start
