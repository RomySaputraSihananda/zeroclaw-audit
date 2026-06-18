# zeroclaw-audit

Webhook audit endpoint for [ZeroClaw](https://github.com/romysaputrasihananda/zeroclaw) tool call monitoring.

Receives `POST /audit` from ZeroClaw's `webhook_audit` builtin hook and pretty-prints every tool call event to stdout — tool name, timestamp, duration, args, and success status.

## Setup

```bash
npm install
npm run build
node dist/main.js
```

Server runs on port `9000` by default. Override with `PORT` env var.

## ZeroClaw Config

Add to `~/.zeroclaw/config.toml`:

```toml
[hooks]
enabled = true

[hooks.builtin.webhook_audit]
enabled       = true
url           = "https://<your-tunnel>.trycloudflare.com/audit"
tool_patterns = ["stellar__*"]   # glob patterns for tools to audit
include_args  = true
```

> ZeroClaw requires HTTPS. Use [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/do-more-with-tunnels/trycloudflare/) to expose the local server:
> ```bash
> cloudflared tunnel --url http://localhost:9000
> ```

## Payload

ZeroClaw POSTs the following JSON on every matching tool call:

```json
{
  "event": "tool_call",
  "timestamp": "2026-06-18T06:30:00Z",
  "tool": "stellar__bmkg-get_latest_earthquake",
  "success": true,
  "duration_ms": 245,
  "error": null,
  "args": { "region": "Indonesia" }
}
```

## Output

```
─── tool call ──────────────────────────────
  ✅  stellar__bmkg-get_latest_earthquake
  time     : 2026-06-18T06:30:00Z
  duration : 245ms
  args     : {
  "region": "Indonesia"
}
────────────────────────────────────────────
```
