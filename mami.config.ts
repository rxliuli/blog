import { defineConfig } from '@mami/cli'
import * as hexo from '@mami/plugin-hexo'
import * as joplin from '@mami/plugin-joplin'
import json from './.joplin-blog.json'

export default defineConfig({
  input: [joplin.input(json), ],
  output:[hexo.output()]
})
