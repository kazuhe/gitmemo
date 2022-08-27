import { Router } from "express";
import sanitizeHtml from 'sanitize-html';
import { marked } from 'marked';
import { select } from "./repository/select.js";

export const createRouter = () => {
  const router = Router()
  
  router.get('/api/greeting', (_, res) => {
    console.log("Requested by client... /api/greeting")
    res.json({ greeting: 'Hello, world!' })
  })

  router.get('/api/md', async (_, res) => {
    console.log("Requested by client... /api/md")

    // TMP 開発環境と本番でパスを変更する
    const root = process.cwd();
    const md = await select(`${root}/index.md`)
    const html = sanitizeHtml(marked.parse(md));
    console.log("html", html)

    res.json(JSON.stringify(html))
  })

  return router
}
