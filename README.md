# OpenAI Realtime Audio Demo
![Banner](public/banner.png) 

This project is a **minimalistic** fork of [openai-realtime-voice-chat](https://github.com/rajkumar060301/openai-realtime-voice-chat), itself derived from [OpenAI Realtime API Beta](https://github.com/openai/openai-realtime-api-beta). The UI is stripped down to a **Connect** button and **Push-to-Talk** for capturing mic audio and hearing GPT responses in near real time. A patch is applied to `@openai/realtime-api-beta` to default to `"gpt-4o-mini-realtime-preview-2024-12-17"` and adjust some config (e.g. voice, temperature).

## Features

- **Push-to-Talk**: Press and hold to send mic audio to GPT; release to finalize your speech.
- **Real-time Audio**: GPT’s partial responses stream back, so you can hear them immediately.
- **Local Relay** *(optional)*: A Node.js server can hide your OpenAI API key via a WebSocket proxy.
- **Docker Compose**: Build and run everything in one step.

## Docker Setup

1. Provide a `docker-compose.yml` that builds both the React front-end and the local Node relay.  
2. In your `.env`, to use the relay server:
   ```ini
   OPENAI_API_KEY=sk-proj-...
   REACT_APP_LOCAL_RELAY_SERVER_URL=http://localhost:8081
   ```
   If **not** provided, the app defaults to connecting directly to `wss://api.openai.com/...` (embedding the API key in the browser).  
3. Run:
   ```bash
   docker-compose up --build
   ```
   - The relay server will run on `http://localhost:8081`.
   - The React app is on `http://localhost:3000`.

## Usage

1. **Open** `http://localhost:3000`.
2. **Click "Connect"** to establish a realtime WebSocket.
   - If you set the environment variables, it’ll connect through the local relay.
   - Otherwise, it’ll prompt for your API key (and connect directly to OpenAI).
3. **Push-to-Talk**:
   - Press and hold the button to capture microphone audio.
   - Release to stop capturing and send your utterance to GPT.
   - Hear partial GPT responses as soon as they’re generated.

## Customizing OpenAI LLM Instructions
To change the instructions for the OpenAI language model, edit the configuration file:

```js
/src/utils/conversation_config.js
```

## Important Notes

- This is an **experimental** API from OpenAI that can be modified or removed at any time.
- The custom patch in `@openai/realtime-api-beta` changes defaults (model, voice, temperature).
- For usage limitations and requirements, see [OpenAI’s policies](https://openai.com/policies/).
- Docker deployment is for convenience; keep your `OPENAI_API_KEY` secure.