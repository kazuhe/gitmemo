import express from 'express'
import router from "./router.js";
import { join } from 'node:path'
import { cwd } from 'node:process';

const expressApp = express()

expressApp.use(router)
expressApp.use(express.static(join(cwd(), "dist")))

export const app = expressApp.listen(3000, () => {
  console.log("App is running at http://localhost:3000")
})
