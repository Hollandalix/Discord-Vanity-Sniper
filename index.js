"use strict";
const tls = require("tls");
const WebSocket = require("ws");
const handleTLSData = require("./log.js");
const config = require("./config.json");

const { wsLink, token, serverId } = config;
const guilds = {};

let tlsSock = null;
let ws = null;

const stabil = () => {
  tlsSock = tls.connect({
    host: "canary.discord.com",
    port: 443,
    minVersion: "TLSv1.2",
    maxVersion: "TLSv1.2",
    servername: "canary.discord.com"
  });

  tlsSock.once("secureConnect", () => {
    establishWSConnection(wsLink);
    handleTLSData(tlsSock, token, serverId);
  });

  tlsSock.on("error", (error) => {
    console.error("TLS Error:", error);
  });

  tlsSock.on("end", () => {
    console.log("TLS connection ended");
  });
};

const handleWSMessage = (msg) => {
  const { t, d, op } = msg;
  if (op === 7)
    process.exit();

  switch (t) {
    case "GUILD_UPDATE":
    case "GUILD_DELETE":
      if (guilds[d.guild_id])
        sendVanityUpdate(guilds[d.guild_id]);
      break;
    case "READY":
      d.guilds.forEach(({ id, vanity_url_code }) => {
        if (vanity_url_code)
          guilds[id] = vanity_url_code;
      });
      console.log("Guilds:", Object.values(guilds).join(", "));
      break;
  }
};

const sendVanityUpdate = (code) => {
  const body = JSON.stringify({ code });
  tlsSock.write(Buffer.from(
    `PATCH /api/v9/guilds/${serverId}/vanity-url HTTP/1.1\r\n` +
    `Host: canary.discord.com\r\nAuthorization: ${token}\r\n` +
    `Content-Type: application/json\r\n` +
    `Content-Length: ${Buffer.byteLength(body)}\r\n\r\n${body}`
  ));
};

const establishWSConnection = (wsLink) => {
  ws = new WebSocket(wsLink);

  ws.once("open", () => {
    ws.send(JSON.stringify({
      op: 2,
      d: {
        token,
        intents: 513 << 0,
        properties: {
          os: "linux",
          browser: "firefox",
          device: "firefox",
        },
      },
    }));
    startHeartbeat();
  });

  ws.on("message", (event) => handleWSMessage(JSON.parse(event.toString())));
  ws.on("error", (error) => {
    console.error("WebSocket Error:", error);
  });
};

const startHeartbeat = () => {
  setInterval(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ op: 0, d: null }));
    }
  }, 30000);
};

stabil(); 
