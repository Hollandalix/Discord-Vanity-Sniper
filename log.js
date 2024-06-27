
const extract = require("extract-json-from-string");
const config = require("./config.json");

module.exports = (tlsSock) => {
  const { token, channel } = config;

  tlsSock.on("data", (data) => {
    const extData = extract(data.toString());
    if (Array.isArray(extData)) {
      const find = extData.find((e) => e.code || (e.message && e.message.toLowerCase().includes("rate")));
      if (find) {
        console.log(find);
        const { code } = find;
        const requestBody = JSON.stringify({ content: `**Wia$e-Hollandalı** \n  https://discord.gg/${code} Vanity Url Bulundu \n \n \n\`\`\`json\n${JSON.stringify(find)}\`\`\`` });
        tlsSock.write(`POST /api/v7/channels/${channel}/messages HTTP/1.1\r\nHost: canary.discord.com\r\nAuthorization: ${token}\r\nContent-Type: application/json\r\nContent-Length: ${Buffer.byteLength(requestBody)}\r\n\r\n${requestBody}`);
      }
    } else {
      console.error("Incorrect array format", extData);
    }
  });

  tlsSock.on("error", (error) => {
    console.error("TLS Error:", error);
    process.exit();
  });

  tlsSock.on("end", () => {
    console.log("TLS connection ended");
    process.exit();
  });
};
