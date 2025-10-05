# Provider Pools Configuration

AIClient-2-API supports provider pool functionality, allowing you to configure multiple provider instances with load balancing and health checks. With provider pools, you can:

- Configure multiple instances of the same or different AI model providers
- Implement automatic load balancing to distribute API requests
- Perform health checks to automatically skip unhealthy providers
- Improve service availability and stability

## Configuration File Structure

The provider pools configuration file (default is `provider_pools.json`) is a JSON file containing configurations for multiple provider types. Each provider type contains an array of provider instances.

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

## Configuration Item Explanation

### Top-Level Structure
- **Provider Type Keys**: Such as `openai-custom`, `gemini-cli-oauth`, `claude-custom`, `claude-kiro-oauth`, `openai-qwen-oauth`, each key corresponds to a provider type
- **Values**: An array of instances for that provider type

### Configuration Items for Each Provider Instance
- **API-Related Configurations**: Depending on the provider type, include appropriate API keys, base URLs, or credential file paths
  - `OPENAI_API_KEY` / `OPENAI_BASE_URL`: OpenAI provider's API key and base URL
  - `CLAUDE_API_KEY` / `CLAUDE_BASE_URL`: Claude provider's API key and base URL
  - `GEMINI_OAUTH_CREDS_FILE_PATH` / `PROJECT_ID`: Gemini provider's credential file path and project ID
  - `KIRO_OAUTH_CREDS_FILE_PATH`: Kiro provider's credential file path
  - `QWEN_OAUTH_CREDS_FILE_PATH`: Qwen provider's credential file path
- **`checkModelName`**: Model name used for health checks, optional configuration
- **`uuid`**: Unique identifier for the instance, used for tracking and management
- **`isHealthy`**: Health status of the instance, automatically updated by the system
- **`lastUsed`**: Timestamp of the last time the instance was used
- **`usageCount`**: Number of times the instance has been used
- **`errorCount`**: Number of errors that occurred with the instance
- **`lastErrorTime`**: Timestamp of the last error that occurred with the instance

## Using Provider Pools

To use the provider pool functionality, configure `PROVIDER_POOLS_FILE_PATH` in `config.json` to point to your provider pool configuration file:

```json
{
  "PROVIDER_POOLS_FILE_PATH": "provider_pools.json",
  "MODEL_PROVIDER": "openai-custom"  // This will select an instance from the openai-custom pool
}
```

When using command-line arguments, you can also specify the provider pool file:

```bash
node src/api-server.js --provider-pools-file provider_pools.json --model-provider openai-custom
```

## Health Checks and Load Balancing

The system automatically performs the following operations:

1. **Health Checks**: Regularly checks the availability of provider instances
2. **Load Balancing**: Distributes requests among healthy instances
3. **Failover**: Automatically skips unhealthy instances
4. **Statistics Tracking**: Records usage and error rates for each instance

This design ensures high service availability and effectively utilizes multiple provider resources.