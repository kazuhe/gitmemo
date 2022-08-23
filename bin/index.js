import { createServer } from 'vite'

const root = process.cwd() + "/node_modules/gitmemo/dist";
console.log("ROOT", root)

;(async () => {
  const server = await createServer({
    // 有効なユーザ設定オプションに `mode` と `configFile` を追加
    configFile: false,
    root,
    server: {
      port: 1337
    }
  })
  await server.listen()

  server.printUrls()
})()
