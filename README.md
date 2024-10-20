# Message Board

## Run mongo container

```bash
docker run -p 27017:27017 -d mongo:8.0.1
```

connection string: `mongodb://localhost:27017/`

## Backend

### Install dependencies

```bash
cd backend
npm install
```

Create `.env` file

```bash
cp .env.sample .env
```

### Development mode

```bash
npm run dev
```

## Frontend

### Install dependencies

```bash
cd frontend
npm install
```

### Development mode

```bash
npm run dev
```

visit port `5173`

### Production build

```bash
npm run build
```

## Deploy project with docker-compose

```bash
docker compose up -d
```

close with

```bash
docker compose down
```
