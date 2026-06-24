# nassimebj.com NestJS Website

Personal branding website for Nassime Benjeddou.

## Stack
- NestJS
- TypeScript
- Static assets in public
- Docker-ready

## Run locally
```bash
npm install
npm run start:dev
```
Open http://localhost:3000

## Production
```bash
npm run build
npm run start:prod
```

## Docker
```bash
docker build -t nassimebj-com .
docker run -p 3000:3000 nassimebj-com
```

## Routes
- / home
- /blog articles list
- /blog/:slug article page
- /api/site site data
- /api/articles articles data
