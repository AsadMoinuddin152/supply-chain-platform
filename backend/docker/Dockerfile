# Use the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code into the container
COPY . .

# Expose the port that the backend will run on
EXPOSE 5000

# Run the application
CMD ["npm", "run", "start"]
