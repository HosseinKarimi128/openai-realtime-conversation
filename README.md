# OpenAI Realtime Audio Demo


![Banner](public/banner.png)


This project is a **minimalistic** fork of [openai-realtime-voice-chat](https://github.com/rajkumar060301/openai-realtime-voice-chat), which itself originated from the [OpenAI Realtime API Beta repository](https://github.com/openai/openai-realtime-api-beta). The UI is reduced to a single **Connect** + **Push-to-Talk** button, with dockerization and a patch for the `@openai/realtime-api-beta` library (switching to a smaller model, adjusting defaults, etc.).

## Features

- **Push-to-Talk**: Press and hold the button to capture your microphone; release to send audio to GPT.
- **Realtime Audio**: GPT responds in partial audio chunks, so playback begins as soon as data arrives.
- **Local Relay** (optional): A Node.js server can hide your OpenAI API key and proxy the WebSocket connection.
- **Docker Compose**: Quickly deploy front-end + local relay.

## Setup with Docker Compose

After creating or editing a suitable `docker-compose.yml`, you can build and run everything with:
```bash
docker-compose up --build
```
This does the following:
1. Builds the React front-end for the minimal UI.
2. Launches a local Node relay (on `ws://localhost:8081`) to handle requests with your `OPENAI_API_KEY`.
3. Serves the final web app at `http://localhost:3000`.

**Note**: In your `.env`, set:
```ini
OPENAI_API_KEY=sk-...
```
so the Node relay can authenticate with OpenAI.

## Usage

1. **Open** `http://localhost:3000`.
2. **Connect**: Click the button to establish a realtime WebSocket to either your local relay or directly to `wss://api.openai.com/...`.
3. **Push-to-Talk**:
   - Click and hold to start sending mic audio.
   - Release to finalize your speech for GPT.
   - GPT’s audio response is streamed back in near real time.


## Customizing OpenAI LLM Instructions
To change the instructions for the OpenAI language model, edit the configuration file:

```js
/src/utils/conversation_config.js
```

## Custom Patch

A small patch is applied to `@openai/realtime-api-beta`, changing the default model to `"gpt-4o-mini-realtime-preview-2024-12-17"` and adjusting voice and temperature.  

## Disclaimers

- This is an **experimental** beta API from OpenAI that may change or become unavailable in the future.
- For usage policies, refer to [OpenAI’s policies](https://openai.com/policies/). 
- The Docker-based deployment is for convenience; ensure you secure and handle your `OPENAI_API_KEY` carefully.