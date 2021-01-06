const simpleGit = require('simple-git')
const git = simpleGit()

async function commit() {
  await git.add('.')
  await git.commit(`更新 ${new Date().toLocaleString()}`)
}

commit()
