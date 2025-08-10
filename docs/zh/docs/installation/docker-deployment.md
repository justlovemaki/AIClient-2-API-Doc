# Docker 部署指南

本指南将帮助您使用 Docker 部署 AIClient2API 服务。

## 构建 Docker 镜像

在项目根目录下执行以下命令来构建 Docker 镜像：

```bash
docker build -t aiclient2api .
```

## 运行容器

### 基本运行

```bash
docker run -d -p 3000:3000 --name aiclient2api aiclient2api
```

### 通过 ARGS 环境变量配置服务

服务支持通过 `ARGS` 环境变量来配置，例如：

```bash
docker run -d \
  -p 3000:3000 \
  -e ARGS="--api-key 123456 --host 0.0.0.0" \
  --name aiclient2api \
  aiclient2api
```

### 使用 PATH 挂载目录的启动脚本

项目包含两个脚本用于便捷启动服务：
- `run-docker.bat` (Windows)
- `run-docker.sh` (Linux/Unix)

这些脚本会自动生成包含凭据的 `ARGS` 环境变量：

```bash
# Windows
run-docker.bat

# Linux/Unix (首次使用需要授予权限)
chmod +x run-docker.sh
./run-docker.sh
```

### 挂载配置文件和日志目录

```bash
# 挂载配置文件
docker run -d \
  -p 3000:3000 \
  -v /path/to/your/config.json:/app/config.json \
  --name aiclient2api \
  aiclient2api

# 挂载日志目录
docker run -d \
  -p 3000:3000 \
  -v /path/to/your/logs:/app/logs \
  --name aiclient2api \
  aiclient2api
```

## 访问服务

容器启动后，您可以通过以下 URL 访问服务：

```
http://localhost:3000
```

## 可用端点

- `POST /v1/chat/completions` - OpenAI 兼容聊天完成端点
- `GET /v1/models` - OpenAI 兼容模型列表端点
- `POST /v1beta/models/{model}:generateContent` - Gemini 兼容内容生成端点
- `GET /v1beta/models` - Gemini 兼容模型列表端点
- `GET /health` - 健康检查端点

## 故障排除

如果容器无法启动，请检查以下内容：

1. 确保端口 3000 未被其他进程占用
2. 检查环境变量配置是否正确
3. 查看容器日志以获取更多信息：

```bash
docker logs aiclient2api