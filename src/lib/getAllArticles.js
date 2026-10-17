import { glob } from 'node:fs/promises'
import * as path from 'path'

async function importArticle(articleFilename) {
  let { meta, default: component } = await import(
    `../pages/articles/${articleFilename}`
  )
  return {
    slug: articleFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
    component,
  }
}

export async function getAllArticles() {
  const directory = path.join(process.cwd(), 'src/pages/articles')
  const entries = await Array.fromAsync(
    glob(['*.mdx', '*/index.mdx'], {
      cwd: directory,
      withFileTypes: true,
    }),
  )
  const articleFilenames = entries
    .filter((entry) => entry.isFile())
    .map((entry) =>
      path.relative(directory, path.join(entry.parentPath, entry.name)),
    )

  let articles = await Promise.all(articleFilenames.map(importArticle))

  return articles.sort((a, z) => new Date(z.date) - new Date(a.date))
}
