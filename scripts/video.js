// mark-magic (Joplin -> Hexo) turns video attachments into plain
// `[name.mp4](/resources/xxx.mp4)` links, not <video> embeds - Joplin has no
// way to know a dropped attachment is a video when it rewrites the link.
// Rewriting that at the mark-magic layer would fix every output plugin at
// once (vitepress/docsify/hugo too), but mark-magic is a separately
// published package with its own release flow, so this filter is the
// pragmatic fix scoped to this blog until that's worth doing properly.
const VIDEO_EXTENSIONS = ['mp4', 'webm', 'mov', 'm4v']

const LINK_PATTERN = new RegExp(
  `!?\\[([^\\]]*)\\]\\(([^)\\s]+\\.(?:${VIDEO_EXTENSIONS.join('|')})(?:\\?[^)]*)?)\\)`,
  'gi',
)
const FENCE_PATTERN = /```[\s\S]*?```/g

function renderVideoLinks(text) {
  return text.replace(LINK_PATTERN, (_match, alt, src) => {
    return `<video src="${src}" controls style="max-width: 100%">${alt}</video>`
  })
}

hexo.extend.filter.register('before_post_render', (data) => {
  // Skip fenced code blocks so a markdown example showing this exact link
  // syntax doesn't itself get rewritten into a <video> tag.
  const fences = data.content.match(FENCE_PATTERN) ?? []
  const parts = data.content.split(FENCE_PATTERN)
  data.content = parts.map((part, i) => renderVideoLinks(part) + (fences[i] ?? '')).join('')
  return data
})
