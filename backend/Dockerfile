FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 3001

CMD ["sh", "-c", "node db/migrate.js --seed-if-empty && node src/index.js"]
