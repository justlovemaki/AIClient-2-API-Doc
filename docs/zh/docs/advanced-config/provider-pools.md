# 提供商池配置

AIClient-2-API 支持提供商池功能，允许你配置多个提供商实例并进行负载均衡和健康检查。通过提供商池，你可以：

- 配置多个相同或不同类型的 AI 模型提供商
- 实现自动负载均衡，分散 API 请求
- 进行健康检查，自动跳过不健康的提供商
- 提高服务的可用性和稳定性

## 配置文件结构

提供商池配置文件（默认为 `provider_pools.json`）是一个 JSON 文件，包含多个提供商类型的配置。每个提供商类型包含一个提供商实例数组。

```json
{
  "openai-custom": [
    {
      "OPENAI_API_KEY": "sk-openai-key1",
      "OPENAI_BASE_URL": "https://api.openai.com/v1",
      "checkModelName": null,
      "uuid": "2f579c65-d3c5-41b1-9985-9f6e3d7bf39c",
      "isHealthy": true,
      "lastUsed": null,
      "usageCount": 0,
      "errorCount": 0,
      "lastErrorTime": null
    },
    {
      "OPENAI_API_KEY": "sk-openai-key2",
      "OPENAI_BASE_URL": "https://api.openai.com/v1",
      "checkModelName": null,
      "uuid": "e284628d-302f-456d-91f3-6095386fb3b8",
      "isHealthy": true,
      "lastUsed": null,
      "usageCount": 0,
      "errorCount": 0,
      "lastErrorTime": null
    }
  ],
  "gemini-cli-oauth": [
    {
      "GEMINI_OAUTH_CREDS_FILE_PATH": "./credentials1.json",
      "PROJECT_ID": "your-project-id-1",
      "checkModelName": null,
      "uuid": "ac200154-26b8-4f5f-8650-e8cc738b06e3",
      "isHealthy": true,
      "lastUsed": null,
      "usageCount": 0,
      "errorCount": 0,
      "lastErrorTime": null
    }
  ],
  "claude-custom": [
    {
      "CLAUDE_API_KEY": "sk-claude-key1",
      "CLAUDE_BASE_URL": "https://api.anthropic.com",
      "checkModelName": null,
      "uuid": "bb87047a-3b1d-4249-adbb-1087ecd58128",
      "isHealthy": true,
      "lastUsed": null,
      "usageCount": 0,
      "errorCount": 0,
      "lastErrorTime": null
    }
  ],
  "claude-kiro-oauth": [
    {
      "KIRO_OAUTH_CREDS_FILE_PATH": "./kiro_creds1.json",
      "uuid": "2c69d0ac-b86f-43d8-9d17-0d300afc5cfd",
      "checkModelName": null,
      "isHealthy": true,
      "lastUsed": null,
      "usageCount": 0,
      "errorCount": 0,
      "lastErrorTime": null
    }
  ],
  "openai-qwen-oauth": [
    {
      "QWEN_OAUTH_CREDS_FILE_PATH": "./qwen_creds.json",
      "uuid": "658a2114-c4c9-d713-b8d4-ceabf0e0bf18",
      "checkModelName": null,
      "isHealthy": true,
      "lastUsed": null,
      "usageCount": 0,
      "errorCount": 0,
      "lastErrorTime": null
    }
  ]
}
```

## 配置项说明

### 顶层结构
- **提供商类型键名**: 如 `openai-custom`, `gemini-cli-oauth`, `claude-custom`, `claude-kiro-oauth`, `openai-qwen-oauth`，每个键名对应一个提供商类型
- **值**: 该提供商类型的实例数组

### 每个提供商实例的配置项
- **API 相关配置**: 根据提供商类型不同，包含相应的 API 密钥、基础 URL 或凭据文件路径
  - `OPENAI_API_KEY` / `OPENAI_BASE_URL`: OpenAI 提供商的 API 密钥和基础 URL
  - `CLAUDE_API_KEY` / `CLAUDE_BASE_URL`: Claude 提供商的 API 密钥和基础 URL
  - `GEMINI_OAUTH_CREDS_FILE_PATH` / `PROJECT_ID`: Gemini 提供商的凭据文件路径和项目 ID
  - `KIRO_OAUTH_CREDS_FILE_PATH`: Kiro 提供商的凭据文件路径
  - `QWEN_OAUTH_CREDS_FILE_PATH`: Qwen 提供商的凭据文件路径
- **`checkModelName`**: 用于健康检查的模型名称，可选配置
- **`uuid`**: 该实例的唯一标识符，用于追踪和管理
- **`isHealthy`**: 该实例的健康状态，系统会自动更新此值
- **`lastUsed`**: 该实例上次使用的时间戳
- **`usageCount`**: 该实例被使用的次数
- **`errorCount`**: 该实例发生错误的次数
- **`lastErrorTime`**: 该实例上次发生错误的时间戳

## 使用提供商池

要使用提供商池功能，需要在 `config.json` 中配置 `PROVIDER_POOLS_FILE_PATH` 指向你的提供商池配置文件：

```json
{
  "PROVIDER_POOLS_FILE_PATH": "provider_pools.json",
  "MODEL_PROVIDER": "openai-custom"  // 这将从 openai-custom 池中选择一个实例
}
```

当使用命令行参数时，也可以指定提供商池文件：

```bash
node src/api-server.js --provider-pools-file provider_pools.json --model-provider openai-custom
```

## 健康检查与负载均衡

系统会自动执行以下操作：

1. **健康检查**: 定期检查提供商实例的可用性
2. **负载均衡**: 在健康的实例之间分配请求
3. **故障转移**: 自动跳过不健康的实例
4. **统计跟踪**: 记录每个实例的使用情况和错误率

这种设计确保了服务的高可用性，并能有效利用多个提供商资源。