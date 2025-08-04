# System Prompt Management

AIClient-2-API allows you to manage system prompts through files.

### Loading System Prompts from File

You can specify a file path containing system prompts using the `--system-prompt-file` parameter:

```bash
node src/api-server.js --system-prompt-file ./my_system_prompt.txt
```

And control its behavior with the `--system-prompt-mode` parameter:

*   `overwrite` (default): The system prompt in the file will overwrite any system prompt in the incoming request.
*   `append`: The system prompt in the file will be appended to the system prompt in the incoming request.

### Real-time Synchronization of System Prompts

AIClient-2-API will write the system prompts included in incoming requests to the `fetch_system_prompt.txt` file in real-time. This is useful for debugging and observing model behavior.