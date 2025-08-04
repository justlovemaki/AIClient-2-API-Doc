# 认证

API 请求需要进行认证。目前支持以下几种认证方式：

1.  **Bearer Token (推荐)**：在请求头中包含 `Authorization: Bearer <YOUR_API_KEY>`。
2.  **`x-goog-api-key` 请求头**：在请求头中包含 `x-goog-api-key: <YOUR_API_KEY>`。
3.  **URL 查询参数**：在 URL 中包含 `?key=<YOUR_API_KEY>`。

你的 API 密钥可以通过启动参数 `--api-key` 进行配置：

```bash
node src/api-server.js --api-key your_secret_api_key
```

如果未指定，默认 API 密钥为 `123456`。