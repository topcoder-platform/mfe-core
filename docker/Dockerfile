# Use the base image with Node.js
FROM node:10.24.0

ARG APPMODE
ARG APPENV
ARG SEGMENT_ANALYTICS_KEY

ENV APPMODE=$APPMODE
ENV APPENV=$APPENV
ENV SEGMENT_ANALYTICS_KEY=$SEGMENT_ANALYTICS_KEY

# Copy the current directory into the Docker image
COPY . /micro-frontends-frame

# Set working directory for future use
WORKDIR /micro-frontends-frame

# Install the dependencies from package.json
RUN npm install

RUN npm run build

CMD npm start
