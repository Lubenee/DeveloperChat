# DeveloperChat

Frontend and backend for the project.

# Setting up the project

## 1.Installing dependencies

```bash
npm i
cd web-client
npm i
```

## 2.Setting up server .ENV

Here we set the environment variables for the server - database settings, redis settings, etc

```bash
cp .env.sample .env
nano .env
```

### Development:

Server:

```bash
npm run dev
```

React:

```bash
cd web-client
npm start
```

### Production:

Server:

```bash
npm start
```

React:

```bash
cd web-client
npm run build
```
