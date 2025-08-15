# 启动 API 服务

在项目的根目录下，通过命令行启动 AIClient-2-API API 服务：

**基本用法:**
```bash
node src/api-server.js
```

**服务器配置:**
```bash
node src/api-server.js --host 127.0.0.1 --port 8080 --api-key your-secret-key
```

**OpenAI 提供商:**
```bash
node src/api-server.js --model-provider openai-custom --openai-api-key sk-xxx --openai-base-url https://api.openai.com/v1
```

**Claude 提供商:**
```bash
node src/api-server.js --model-provider claude-custom --claude-api-key sk-ant-xxx --claude-base-url https://api.anthropic.com
```

**Gemini 提供商（使用 Base64 凭据的 OAuth）:**
```bash
node src/api-server.js --model-provider gemini-cli-oauth --gemini-oauth-creds-base64 eyJ0eXBlIjoi... --project-id your-project-id
```

**Gemini 提供商（使用凭据文件的 OAuth）:**
```bash
node src/api-server.js --model-provider gemini-cli-oauth --gemini-oauth-creds-file /path/to/credentials.json --project-id your-project-id
```

**Kiro 提供商 (使用 Base64 凭据):**
```bash
node src/api-server.js --model-provider claude-kiro-oauth --kiro-oauth-creds-base64 eyJ0eXBlIjoi...
```

**Kiro 提供商 (使用凭据文件):**
```bash
node src/api-server.js --model-provider claude-kiro-oauth --kiro-oauth-creds-file /path/to/kiro_credentials.json
```

**系统提示管理:**
```bash
node src/api-server.js --system-prompt-file custom-prompt.txt --system-prompt-mode append
```

**日志配置:**
```bash
node src/api-server.js --log-prompts console
node src/api-server.js --log-prompts file --prompt-log-base-name my-logs
```

**完整示例:**
```bash
node src/api-server.js \
  --host 127.0.0.1 \
  --port 3000 \
  --api-key my-secret-key \
  --model-provider gemini-cli-oauth \
  --project-id my-gcp-project \
  --gemini-oauth-creds-file ./credentials.json \
  --system-prompt-file ./custom-system-prompt.txt \
  --system-prompt-mode overwrite \
  --log-prompts file \
  --prompt-log-base-name api-logs