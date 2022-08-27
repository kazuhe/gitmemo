import express, { Express, Router } from 'express'
import { createRouter } from "./router.js";

const createServer = (publicDir: string, router: Router): Express => {
  const app = express()
  app.use(router)
  app.use(express.static(publicDir))

  return app
}

export const serve = (publicDir: string) => {
  const app = createServer(publicDir, createRouter())
  app.listen(3000, () => {
    console.log("App is running at http://localhost:3000")
  })
}
