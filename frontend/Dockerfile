FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm i

# Bundle app source
COPY . .

EXPOSE 5173

# Start the app
CMD [ "npm", "run", "dev" ]
