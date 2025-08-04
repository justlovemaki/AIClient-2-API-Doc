# Health Check

You can check the health status of the API service by accessing the `/health` endpoint:

```
GET http://localhost:3000/health
```

Example Response:

```json
{
  "status": "healthy",
  "timestamp": "2025-08-03T09:00:00.000Z",
  "provider": "gemini-cli-oauth"
}