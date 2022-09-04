import {
  Application,
  ApplicationConfig,
  BlogHexoIntegrated,
  BlogHexoIntegratedConfig,
  GeneratorEvents,
  ProcessInfo,
} from 'joplin-blog'
import { CommonNote, CommonTag, CommonResource } from 'joplin-blog/dist/model/CommonNote'
import _config from './.joplin-blog.json'

class GeneratorEventsImpl implements GeneratorEvents {
  copyResources(options: ProcessInfo): void {
    console.log(`${options.rate}/${options.all} 正在读取笔记附件与标签: `, options.title)
  }

  parseAndWriteNotes(options: ProcessInfo): void {
    console.log(
      `${options.rate}/${options.all} 正在解析笔记中的 Joplin 内部链接与附件资源: ${options.title}`,
      options.title,
    )
  }

  readNoteAttachmentsAndTags(options: ProcessInfo): void {
    console.log(`${options.rate}/${options.all} 正在写入笔记: ${options.title}`, options.title)
  }

  writeNote(options: ProcessInfo): void {
    console.log(`${options.rate}/${options.all} 正在处理资源: ${options.title}`)
  }
}

class BlogIntegrated extends BlogHexoIntegrated {
  // 允许通过覆盖这个方法来修改每个笔记的元数据
  meta(note: CommonNote & { tags: CommonTag[]; resources: CommonResource[] }) {
    return {
      ...super.meta(note),
    }
  }
}

async function main() {
  const config: ApplicationConfig & BlogHexoIntegratedConfig = {
    ...(_config as ApplicationConfig),
    rootPath: __dirname,
  }
  const generatorEvents = new GeneratorEventsImpl()
  await new Application(config, new BlogIntegrated(config))
    .gen()
    .on('readNoteAttachmentsAndTags', generatorEvents.readNoteAttachmentsAndTags)
    .on('parseAndWriteNotes', generatorEvents.parseAndWriteNotes)
    .on('writeNote', generatorEvents.writeNote)
    .on('copyResources', generatorEvents.copyResources)
}

main()

