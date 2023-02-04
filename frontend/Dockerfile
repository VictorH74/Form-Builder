FROM node:14

# Create app directory
WORKDIR /app/frontend

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install

# Bundle app source
COPY . .

# Start the app
CMD [ "vite" ]
