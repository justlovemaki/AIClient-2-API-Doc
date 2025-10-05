# Starting the API Service

Start the AIClient-2-API API service from the project root directory using the command line:

**Basic Usage:**
```bash
node src/api-server.js
```

**Server Configuration:**
```bash
node src/api-server.js --host 127.0.0.1 --port 8080 --api-key your-secret-key
```

**OpenAI Provider:**
```bash
node src/api-server.js --model-provider openai-custom --openai-api-key sk-xxx --openai-base-url https://api.openai.com/v1
```

**Claude Provider:**
```bash
node src/api-server.js --model-provider claude-custom --claude-api-key sk-ant-xxx --claude-base-url https://api.anthropic.com
```

**Gemini Provider (using Base64 credentials for OAuth):**
```bash
node src/api-server.js --model-provider gemini-cli-oauth --gemini-oauth-creds-base64 eyJ0eXBlIjoi... --project-id your-project-id
```

**Gemini Provider (using credentials file for OAuth):**
```bash
node src/api-server.js --model-provider gemini-cli-oauth --gemini-oauth-creds-file /path/to/credentials.json --project-id your-project-id
```

**Kiro Provider (using Base64 credentials):**
```bash
node src/api-server.js --model-provider claude-kiro-oauth --kiro-oauth-creds-base64 eyJ0eXBlIjoi...
```

**Kiro Provider (using credentials file):**
```bash
node src/api-server.js --model-provider claude-kiro-oauth --kiro-oauth-creds-file /path/to/kiro_credentials.json
```
**Qwen Provider (using credentials file):**
```bash
node src/api-server.js --model-provider openai-qwen-oauth --qwen-oauth-creds-file /path/to/qwen_credentials.json
```

**Using Provider Pools:**
```bash
node src/api-server.js --provider-pools-file provider_pools.json --model-provider openai-custom
```

**System Prompt Management:**
```bash
node src/api-server.js --system-prompt-file custom-prompt.txt --system-prompt-mode append
```

**Logging Configuration:**
```bash
node src/api-server.js --log-prompts console
node src/api-server.js --log-prompts file --prompt-log-base-name my-logs
```

**Full Example:**
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