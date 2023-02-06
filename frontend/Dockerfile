FROM node:18-alpine

RUN mkdir -p /app/frontend

# Create app directory
WORKDIR /app/frontend

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 5173

# Start the app
CMD [ "npm", "run", "dev" ]
