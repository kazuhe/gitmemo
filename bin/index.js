#!/usr/bin/env node

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { preview } = require("vite");
const arg = process.argv[2];

// `npx gitmemo` の場合のみ Web preview
if (arg === undefined) {
  (async () => {
    const previewServer = await preview({
      preview: {
        port: 8080,
        open: true,
      },
    });
    previewServer.printUrls();
  })();
}

require("../libs");
