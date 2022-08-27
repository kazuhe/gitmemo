import express, { Express, Router } from 'express'
import { createRouter } from "./router.js";
import { join } from 'node:path'
import { cwd } from 'node:process';

const createServer = (root: string, router: Router): Express => {
  const app = express()
  app.use(router)
  app.use(express.static(join(root, "dist/client")))

  return app
}

const app = createServer(cwd(), createRouter())
app.listen(3000, () => {
  console.log("App running at http://localhost:3000")
})
