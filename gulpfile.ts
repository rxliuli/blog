import simpleGit from 'simple-git'
import { DateTime } from 'luxon'

export async function commit() {
  const git = simpleGit()
  await git.add('.')
  await git.commit(`更新 ${DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss')}`)
  await git.push()
}
