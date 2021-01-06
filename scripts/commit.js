const simpleGit = require('simple-git')
const git = simpleGit()
const { DateTime } = require('luxon')

async function commit() {
  await git.add('.')
  await git.commit(`更新 ${DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss')}`)
}

commit()
