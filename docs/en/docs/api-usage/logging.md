# Logging Configuration

AIClient-2-API provides detailed logging capabilities to monitor and debug API requests.

Configure the logging mode using the `--log-prompts` parameter:

*   `none` (default): No prompt logs are recorded.
*   `console`: Prompt logs are output to the console.
*   `file`: Prompt logs are written to a file.

When `log-prompts` is set to `file`, you can customize the base name of the log file using the `--prompt-log-base-name` parameter (default `prompt_log`). Log file names will be generated in the format `prompt_log-YYYYMMDD-HHMMSS.log`.

**Example:**

```bash
node src/api-server.js --log-prompts file --prompt-log-base-name my_api_logs