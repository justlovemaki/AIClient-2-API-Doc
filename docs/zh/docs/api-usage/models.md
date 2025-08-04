# 模型列表

AIClient-2-API API 支持列出后端 LLM 提供的模型。

### OpenAI 兼容接口

```
GET http://localhost:3000/v1/models
```

这将返回一个模拟 OpenAI `models` 端点的响应，其中包含后端配置的 LLM 模型列表。

### Gemini 兼容接口

```
GET http://localhost:3000/v1beta/models
```

这将返回一个模拟 Gemini `models` 端点的响应。