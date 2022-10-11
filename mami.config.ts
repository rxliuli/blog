import { defineConfig } from '@mami/cli'
import { hexoOutput } from '@mami/plugin-hexo-output'
import { joplinInput } from '@mami/plugin-joplin-input'
import json from './.joplin-blog.json'

export default defineConfig({
  plugins: [joplinInput(json), hexoOutput()],
})
