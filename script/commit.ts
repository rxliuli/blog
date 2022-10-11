import simpleGit from 'simple-git'
import dayjs from 'dayjs'

async function commit() {
  const git = simpleGit()
  await git.add('.')
  await git.commit(`更新 ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`)
  await git.push()
}

commit()

