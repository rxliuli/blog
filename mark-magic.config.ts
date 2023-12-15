import { defineConfig } from '@mark-magic/cli'
import { OutputPlugin } from '@mark-magic/core'
import path from 'path'
import * as local from '@mark-magic/plugin-local'
import * as joplin from '@mark-magic/plugin-joplin'
import json from './.joplin-blog.json'

export function hexo(options?: {
  path?: string
  baseUrl?: string
}): OutputPlugin {
  const root = options?.path ?? path.resolve()
  const postsPath = path.resolve(root, 'source/_posts')
  const resourcePath = path.resolve(root, 'source/resources')
  const p = local.output({
    rootContentPath: postsPath,
    rootResourcePath: resourcePath,
    meta: (it) => ({
      layout: 'post',
      title: it.name,
      abbrlink: it.id,
      tags: it.extra?.tags.map((it: { title: string }) => it.title),
      categories: it.path,
      date: it.created,
      updated: it.updated,
    }),
    contentLink: (it) =>
      path.join('/', options?.baseUrl ?? '/', `/p/${it.linkContentId}`),
    resourceLink: (it) =>
      `/resources/${it.resource.id}${path.extname(it.resource.name)}`,
    contentPath: (it) => path.resolve(postsPath, it.id + '.md'),
    resourcePath: (it) =>
      path.resolve(resourcePath, it.id + path.extname(it.name)),
  })
  p.name = 'hexo'
  return p
}

export default defineConfig([
  {
    name: 'joplin => hexo',
    input: joplin.input(json),
    output: hexo(),
  },
])
