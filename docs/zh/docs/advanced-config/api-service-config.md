# API 服务相关配置

虽然 `api-server.js` 优先从命令行参数读取配置，但它也支持从 `config.json` 文件（如果存在）加载默认值。以下是与 API 服务相关的关键配置项及其说明：

| 参数名称 | 描述 | 默认值 |
| :------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------- |
| `REQUIRED_API_KEY`         | 客户端访问 API 所需的密钥。 | `"123456"` |
| `SERVER_PORT`              | API 服务监听的端口。 | `3000` |
| `HOST`                     | API 服务监听的地址。 | `"localhost"` |
| `MODEL_PROVIDER`           | AI 模型提供商。可选值包括：<br> - `gemini-cli-oauth`: 使用 Google Gemini CLI 认证。 <br> - `openai-custom`: 使用 OpenAI 兼容 API。 <br> - `claude-custom`: 使用 Claude 兼容 API。<br> - `claude-kiro-oauth`: 使用 Kiro/CodeWhisperer 访问 Claude。 | `"gemini-cli-oauth"` |
| `OPENAI_API_KEY`           | 当 `MODEL_PROVIDER` 为 `openai-custom` 时，OpenAI API 的密钥。 | `null` |
| `OPENAI_BASE_URL`          | 当 `MODEL_PROVIDER` 为 `openai-custom` 时，OpenAI API 的基础 URL。 | `null` |
| `CLAUDE_API_KEY`           | 当 `MODEL_PROVIDER` 为 `claude-custom` 时，Claude API 的密钥。 | `null` |
| `CLAUDE_BASE_URL`          | 当 `MODEL_PROVIDER` 为 `claude-custom` 时，Claude API 的基础 URL。 | `null` |
| `GEMINI_OAUTH_CREDS_BASE64`| 当 `MODEL_PROVIDER` 为 `gemini-cli-oauth` 时，Gemini OAuth 凭据的 Base64 字符串。 | `null` |
| `GEMINI_OAUTH_CREDS_FILE_PATH` | 当 `MODEL_PROVIDER` 为 `gemini-cli-oauth` 时，Gemini OAuth 凭据 JSON 文件的路径。 | `null` |
| `KIRO_OAUTH_CREDS_BASE64`  | 当 `MODEL_PROVIDER` 为 `claude-kiro-oauth` 时，Kiro OAuth 凭据的 Base64 字符串。 | `null` |
| `KIRO_OAUTH_CREDS_FILE_PATH` | 当 `MODEL_PROVIDER` 为 `claude-kiro-oauth` 时，Kiro OAuth 凭据 JSON 文件的路径。 | `null` |
| `PROJECT_ID`               | 当 `MODEL_PROVIDER` 为 `gemini-cli-oauth` 时，Google Cloud 项目 ID。 | `null` |
| `SYSTEM_PROMPT_FILE_PATH`  | 包含系统提示词的文件路径。 | `"input_system_prompt.txt"` |
| `SYSTEM_PROMPT_MODE`       | 系统提示词处理模式：`overwrite` (覆盖) 或 `append` (追加)。 | `"overwrite"` |
| `PROMPT_LOG_BASE_NAME`     | 提示词日志文件的基础名称。 | `"prompt_log"` |
| `PROMPT_LOG_MODE`          | 提示词日志模式：`console` (控制台)、`file` (文件) 或 `none` (不记录)。 | `"none"` |
| `REQUEST_MAX_RETRIES`      | API 请求失败时的最大重试次数。 | `3` |
| `REQUEST_BASE_DELAY`       | API 请求重试时的基础延迟时间（毫秒），每次重试时呈指数增长。 | `1000` |
| `CRON_NEAR_MINUTES`        | 在令牌过期前触发刷新的分钟数。 | `5` |
| `CRON_REFRESH_TOKEN`       | 是否启用自动令牌刷新。 | `true` |

**示例 `config.json` (可以放置在项目根目录下):**

```json
{
  "REQUIRED_API_KEY": "my_super_secret_key",
  "SERVER_PORT": 8005,
  "HOST": "127.0.0.1",
  "MODEL_PROVIDER": "gemini-cli-oauth",
  "GEMINI_OAUTH_CREDS_FILE_PATH": "/path/to/credentials.json",
  "PROJECT_ID": "your-gcp-project-id",
  "SYSTEM_PROMPT_FILE_PATH": "./custom_system_prompt.txt",
  "SYSTEM_PROMPT_MODE": "append",
  "PROMPT_LOG_MODE": "file",
  "PROMPT_LOG_BASE_NAME": "aiclient_2_api_logs",
  "REQUEST_MAX_RETRIES": 5,
  "REQUEST_BASE_DELAY": 2000,
  "CRON_NEAR_MINUTES": 5,
  "CRON_REFRESH_TOKEN": true
}
```

通过合理配置 `config.json`，你可以精细控制 AIClient-2-API 的行为，使其更好地适应你的需求和硬件环境。