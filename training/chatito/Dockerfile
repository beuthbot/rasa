FROM alpine:3.7

# install node
RUN apk add --no-cache --update nodejs nodejs-npm python

# create app directory
RUN mkdir -p /app/input
RUN mkdir -p /app/output

# change in to app directory
WORKDIR /app

# install chatito
RUN npm i chatito --save

# copy required input sources & execution script
COPY input /app/input
COPY entrypoint /app

# make entrypoint executable
RUN chmod +x /app/entrypoint

# run the entrypoint executable
ENTRYPOINT /app/entrypoint
