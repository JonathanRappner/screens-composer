# Screens

## Development
```bash
docker compose up
```

URLs:
- http://screens.localhost
- http://screens-api.localhost
- http://static.localhost


## Production
Copy __docker-compose.prod.example.yml__ to __docker-compose.prod.yml__ and change URLs.
```bash
docker compose -f ./docker-compose.yml -f ./docker-compose.prod.yml up -d
```