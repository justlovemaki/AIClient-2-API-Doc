# Authentication

API requests require authentication. The following authentication methods are currently supported:

1.  **Bearer Token (recommended)**: Include `Authorization: Bearer <YOUR_API_KEY>` in the request header.
2.  **`x-goog-api-key` Request Header**: Include `x-goog-api-key: <YOUR_API_KEY>` in the request header.
3.  **URL Query Parameter**: Include `?key=<YOUR_API_KEY>` in the URL.

Your API key can be configured via the `--api-key` startup parameter:

```bash
node src/api-server.js --api-key your_secret_api_key
```

If not specified, the default API key is `123456`.