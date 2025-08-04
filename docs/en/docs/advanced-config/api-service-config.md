# API Service Related Configuration

While `api-server.js` prioritizes reading configurations from command-line arguments, it also supports loading default values from a `config.json` file (if present). Below are key configuration items related to the API service and their descriptions:

| Parameter Name | Description | Default Value |
| :------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------- |
| `REQUIRED_API_KEY`         | The key required for clients to access the API. | `"123456"` |
| `SERVER_PORT`              | The port on which the API service listens. | `3000` |
| `HOST`                     | The address on which the API service listens. | `"localhost"` |
| `MODEL_PROVIDER`           | The AI model provider. Optional values include:<br> - `gemini-cli-oauth`: Uses Google Gemini CLI authentication. <br> - `openai-custom`: Uses OpenAI compatible API. <br> - `claude-custom`: Uses Claude compatible API.<br> - `kiro-api`: Uses Kiro/CodeWhisperer to access Claude. | `"gemini-cli-oauth"` |
| `OPENAI_API_KEY`           | OpenAI API key when `MODEL_PROVIDER` is `openai-custom`. | `null` |
| `OPENAI_BASE_URL`          | OpenAI API base URL when `MODEL_PROVIDER` is `openai-custom`. | `null` |
| `CLAUDE_API_KEY`           | Claude API key when `MODEL_PROVIDER` is `claude-custom`. | `null` |
| `CLAUDE_BASE_URL`          | Claude API base URL when `MODEL_PROVIDER` is `claude-custom`. | `null` |
| `GEMINI_OAUTH_CREDS_BASE64`| Base64 string of Gemini OAuth credentials when `MODEL_PROVIDER` is `gemini-cli-oauth`. | `null` |
| `GEMINI_OAUTH_CREDS_FILE_PATH` | Path to the Gemini OAuth credentials JSON file when `MODEL_PROVIDER` is `gemini-cli-oauth`. | `null` |
| `KIRO_OAUTH_CREDS_BASE64`  | Base64 string of Kiro OAuth credentials when `MODEL_PROVIDER` is `kiro-api`. | `null` |
| `KIRO_OAUTH_CREDS_FILE_PATH` | Path to the Kiro OAuth credentials JSON file when `MODEL_PROVIDER` is `kiro-api`. | `null` |
| `PROJECT_ID`               | Google Cloud Project ID when `MODEL_PROVIDER` is `gemini-cli-oauth`. | `null` |
| `SYSTEM_PROMPT_FILE_PATH`  | Path to the file containing system prompts. | `"input_system_prompt.txt"` |
| `SYSTEM_PROMPT_MODE`       | System prompt processing mode: `overwrite` or `append`. | `"overwrite"` |
| `PROMPT_LOG_BASE_NAME`     | Base name for prompt log files. | `"prompt_log"` |
| `PROMPT_LOG_MODE`          | Prompt log mode: `console`, `file`, or `none`. | `"none"` |
| `REQUEST_MAX_RETRIES`      | Maximum number of retries for API requests upon failure. | `3` |
| `REQUEST_BASE_DELAY`       | Base delay time (in milliseconds) for API request retries, which increases exponentially with each retry. | `1000` |

**Example `config.json` (can be placed in the project root directory):**

```json
{
  "REQUIRED_API_KEY": "my_super_secret_key",
  "SERVER_PORT": 8005,
  "HOST": "0.0.0.0",
  "MODEL_PROVIDER": "gemini-cli-oauth",
  "GEMINI_OAUTH_CREDS_FILE_PATH": "/path/to/credentials.json",
  "PROJECT_ID": "your-gcp-project-id",
  "SYSTEM_PROMPT_FILE_PATH": "./custom_system_prompt.txt",
  "SYSTEM_PROMPT_MODE": "append",
  "PROMPT_LOG_MODE": "file",
  "PROMPT_LOG_BASE_NAME": "aiclient_2_api_logs",
  "REQUEST_MAX_RETRIES": 5,
  "REQUEST_BASE_DELAY": 2000
}
```

By appropriately configuring `config.json`, you can finely control the behavior of AIClient-2-API to better suit your needs and hardware environment.