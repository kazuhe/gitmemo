import express from 'express'
import { join, dirname } from 'node:path'
import { cwd } from 'node:process'
import { fileURLToPath } from 'node:url'
import { createRouter } from "./router.js";

export const server = () => {
  const publicDir = join(dirname(fileURLToPath(import.meta.url)), "..", "client")
  const root = cwd()

  const app = express()
  const router = createRouter(root)
  app.use(router)
  app.use(express.static(publicDir))

  app.listen(3000, () => {
    console.log("App is running at http://localhost:3000")
  })
}
