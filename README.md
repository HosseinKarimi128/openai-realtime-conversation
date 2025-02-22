# OpenAI Realtime Audio Demo

This project demonstrates **real-time** audio interaction with an experimental _beta_ [OpenAI Realtime API](https://platform.openai.com/docs/guides/experimental-realtime). The UI is extremely minimal: a **single button** to connect and then a **push-to-talk** experience. Your microphone audio is streamed to GPT, and GPT streams back partial audio responses in near real time.

## Features

- **Push-to-Talk**: Click/hold the button to start recording mic audio; release to let GPT process what you said.
- **Realtime Audio**: GPT’s responses are streamed chunk by chunk; you can hear partial results as they’re generated.
- **Local Relay** *(optional)*: A Node.js server can proxy your OpenAI API key, so it’s never exposed in the browser.
- **Custom Patch to `@openai/realtime-api-beta`**: This sets the default model to `"gpt-4o-mini-realtime-preview-2024-12-17"` and modifies some default configuration (e.g., voice and temperature).

## Setup (Docker Compose)

A simple way to deploy is via **Docker Compose** (a `docker-compose.yml` is included). After creating or editing that file to your liking:
```bash
docker-compose up --build
```
This will:
1. Build the front-end React app.
2. Run the local Node relay (on `ws://localhost:8081`) that proxies requests to OpenAI with your `OPENAI_API_KEY`.
3. Serve the app (on `http://localhost:3000` by default).

Your `.env` should contain:
```
OPENAI_API_KEY=sk-...
```
so the local relay can authorize requests.

## Usage

1. **Open** `http://localhost:3000`.
2. **Connect**: The app can either prompt for your API key (if not using the local relay) or connect automatically if you configured the relay.
3. **Push-to-Talk**:
   - Hold the button to speak, release to send audio to GPT.
   - GPT’s audio response arrives in partial chunks for immediate playback.

## Important Notes

- This uses a **beta** Realtime API from OpenAI. It may change or be removed in the future.
- A custom patch was applied to `@openai/realtime-api-beta` that changes the default model and other settings.
- Please see [OpenAI’s usage policies](https://openai.com/policies/) for further terms and guidelines.