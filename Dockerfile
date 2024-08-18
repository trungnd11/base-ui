# 1. For build React app
# Fetching the latest node image on alpine linux
FROM node:20 AS development

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /react-app-baseui

# Installing dependencies
COPY ./package*.json /react-app-baseui/

RUN yarn install

# Copying all the files in our project
COPY . .

# Starting our application
CMD ["yarn","start"]