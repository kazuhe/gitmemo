import sanitizeHtml from 'sanitize-html';
import { marked } from 'marked';
import { fetchMemo } from "../infrastructure/memo/file"

export default async () => {
  // const md = await fetchMemo(`./playground/index.md`)
  const md = await fetchMemo(`${process.cwd()}/index.md`)
  const html = sanitizeHtml(marked.parse(md));

  return html
}
