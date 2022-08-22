import sanitizeHtml from 'sanitize-html';
import { marked } from 'marked';
import { fetchMemo } from "../infrastructure/memo/file"

export default async () => {
  const root = process.env.NODE_ENV === 'development' ? "./playground" : process.cwd();
  const md = await fetchMemo(`${root}/index.md`)
  const html = sanitizeHtml(marked.parse(md));

  return html
}
