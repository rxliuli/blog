# 提高 npm 下载依赖的速度

## 解决方案 1(没有弄好...)

使用代理
  `npm config set proxy http://127.0.0.1:1080`
  `npm config set registry=http://registry.npmjs.org`

## 解决方案 2

使用淘宝镜像

- 临时使用
  `npm [你需要执行的命令] --registry https://registry.npm.taobao.org`
- 持久使用
  `npm config set registry https://registry.npm.taobao.org`
- 或者使用 cnpm
  `npm install -g cnpm --registry=https://registry.npm.taobao.org`
  > 不推荐使用该方法，cnpm 下载的依赖包很奇怪，和 npm 下载的并不一样呢
