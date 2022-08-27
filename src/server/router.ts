import { Router } from "express";

export const createRouter = () => {
  const router = Router()
  router.get('/api/greeting', (_, res) => {
    console.log("Requested by client... /api/greeting")
    res.json({ greeting: 'Hello, world!' })
  })

  return router
}
