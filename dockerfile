FROM node
WORKDIR /home/node/app
COPY . /home/node/app
RUN npm install
EXPOSE 3000
RUN npm run build
CMD ["npm", "start"]
