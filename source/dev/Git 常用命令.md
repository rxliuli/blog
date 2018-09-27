# Git 常用命令

## 基本

### add 添加到 git 跟踪

命令

```sh
git add [要追踪的文件/路径]
```

例

```sh
git add -A # 追踪仓库目录下的所有文件
```

### commit 提交当前的修改内容

命令

```sh
git commit [路径] [选项] [提交说明]
```

例

```sh
git commit -a -m "提交全部的修改" # 提交了全部的修改内容（仍在本机）
```

### revert 撤销掉指定提交

撤销指定提交，然后将撤销的内容作为修改提交一次，保留了所有的记录

命令

```sh
git revert [提交记录 id]
```

例

```sh
git revert ab1c2d2815f1a5cd64aba24a2f321febbc7178bb
```