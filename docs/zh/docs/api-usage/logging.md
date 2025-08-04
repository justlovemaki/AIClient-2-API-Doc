# 日志配置

AIClient-2-API 提供了详细的日志功能，方便你监控和调试 API 请求。

通过 `--log-prompts` 参数配置日志模式：

*   `none` (默认): 不记录提示词日志。
*   `console`: 将提示词日志输出到控制台。
*   `file`: 将提示词日志记录到文件中。

当 `log-prompts` 设置为 `file` 时，你可以通过 `--prompt-log-base-name` 参数自定义日志文件的基础名称 (默认 `prompt_log`)。日志文件名将以 `prompt_log-YYYYMMDD-HHMMSS.log` 的格式生成。

**示例:**

```bash
node src/api-server.js --log-prompts file --prompt-log-base-name my_api_logs