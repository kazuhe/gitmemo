import { createServer } from 'vite'

const isDev = process.argv[2] === "--dev";
const root = isDev ? process.cwd() : process.cwd() + "/node_modules/gitmemo/dist";

;(async () => {  
  const server = await createServer({
    // 有効なユーザ設定オプションに `mode` と `configFile` を追加
    configFile: isDev ? `${root}/vite.config.ts` : false,
    root,
    server: {
      port: 1337
    }
  })
  await server.listen()

  server.printUrls()
})()
