FROM node:22

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies into /app
RUN npm install --prefix /app

# Copy source code
COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
