# Docker Deployment Guide

This guide will help you deploy the AIClient2API service using Docker.

## Building the Docker Image

Execute the following command in the project root directory to build the Docker image:

```bash
docker build -t aiclient2api .
```

## Running the Container

### Basic Run

```bash
docker run -d -p 3000:3000 --name aiclient2api aiclient2api
```

### Configuring the Service via ARGS Environment Variable

The service supports configuration via the `ARGS` environment variable, for example:

```bash
docker run -d \
  -p 3000:3000 \
  -e ARGS="--api-key 123456 --host 0.0.0.0" \
  --name aiclient2api \
  aiclient2api
```

### Using Startup scripts that use PATH mounted directories

The project contains two scripts for convenient service startup:
- `run-docker.bat` (Windows)
- `run-docker.sh` (Linux/Unix)

These scripts will automatically generate the `ARGS` environment variable containing the credentials:

```bash
# Windows
run-docker.bat

# Linux/Unix (requires permission on first use)
chmod +x run-docker.sh
./run-docker.sh
```

### Mounting Configuration Files and Log Directory

```bash
# Mounting configuration file
docker run -d \
  -p 3000:3000 \
  -v /path/to/your/config.json:/app/config.json \
  --name aiclient2api \
  aiclient2api

# Mounting log directory
docker run -d \
  -p 3000:3000 \
  -v /path/to/your/logs:/app/logs \
  --name aiclient2api \
  aiclient2api
```

## Accessing the Service

After the container starts, you can access the service via the following URL:

```
http://localhost:3000
```

## Available Endpoints

- `POST /v1/chat/completions` - OpenAI compatible chat completion endpoint
- `GET /v1/models` - OpenAI compatible model list endpoint
- `POST /v1beta/models/{model}:generateContent` - Gemini compatible content generation endpoint
- `GET /v1beta/models` - Gemini compatible model list endpoint
- `GET /health` - Health check endpoint

## Troubleshooting

If the container fails to start, please check the following:

1. Ensure port 3000 is not occupied by another process
2. Check if the environment variable configuration is correct
3. View container logs for more information:

```bash
docker logs aiclient2api