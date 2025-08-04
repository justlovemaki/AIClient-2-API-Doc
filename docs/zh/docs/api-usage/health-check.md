# 健康检查

你可以通过访问 `/health` 端点来检查 API 服务的健康状态：

```
GET http://localhost:3000/health
```

响应示例：

```json
{
  "status": "healthy",
  "timestamp": "2025-08-03T09:00:00.000Z",
  "provider": "gemini-cli-oauth"
}