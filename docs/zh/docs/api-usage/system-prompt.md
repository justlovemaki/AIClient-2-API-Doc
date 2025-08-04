# 系统提示词管理

AIClient-2-API 允许你通过文件管理系统提示词。

### 从文件加载系统提示词

你可以通过 `--system-prompt-file` 参数指定一个包含系统提示词的文件路径：

```bash
node src/api-server.js --system-prompt-file ./my_system_prompt.txt
```

并通过 `--system-prompt-mode` 参数控制其行为：

*   `overwrite` (默认): 文件中的系统提示词将覆盖传入请求中的任何系统提示词。
*   `append`: 文件中的系统提示词将追加到传入请求中的系统提示词之后。

### 实时同步系统提示词

AIClient-2-API 会将传入请求中包含的系统提示词实时写入到 `fetch_system_prompt.txt` 文件中。这对于调试和观察模型行为非常有用。