---
title: 'Linux SSH 远程连接出现 [Host key verification failed]'
tags: Linux
abbrlink: fdb60858
date: 2018-08-22 09:33:40
updated: 2018-08-22 09:33:40
---

# Linux SSH 远程连接出现 [Host key verification failed]

今早设置了服务器的 SSH 后尝试连接结果出现了这个错误

```bash
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the ECDSA key sent by the remote host is
SHA256:LlGBRJTgQmY2rDmEi/PH6Ql0UF1zX/nbQXHwORhTK1Q.
Please contact your system administrator.
Add correct host key in ~/.ssh/known_hosts to get rid of this message.
Offending ECDSA key in ~/.ssh/known_hosts:14
ECDSA host key for 119.32.78.141 has changed and you have requested strict checking.
Host key verification failed.
```

关键是最后一句话：**主机密钥验证失败**

想了一下好像是之前也有设置过一次 SSH，所以这次才会不认了呀，删除掉 `~/.ssh/known_hosts` 文件就好啦
