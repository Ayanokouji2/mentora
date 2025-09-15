FROM node:22.17.0
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Run the Vite development server
CMD ["npm", "run", "dev"]