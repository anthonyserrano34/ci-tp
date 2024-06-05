FROM node:14-alpine

WORKDIR /app

COPY frontend frontend
COPY backend backend

RUN npm install --prefix frontend && npm install --prefix backend

RUN npm run build --prefix frontend

EXPOSE 3000
EXPOSE 5000

CMD npm start --prefix frontend & npm start --prefix backend
