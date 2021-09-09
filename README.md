# vue2-component-repo-preset

用于快速创建 Vue2 UI 组件库

**使用方法**

```shell
npx @vue/cli create --preset git@github.com:Mrooze-zeng/vue2-component-repo-preset.git <project-name>
```

如出现以下错误，可以先把仓库拉下来，再运行

```shell
npx @vue/cli create --preset ./vue2-component-repo-preset <project-name>
```

```
Fetching remote preset git@github.com:Mrooze-zeng/vue2-component-repo-preset.git...
 ERROR  Failed fetching remote preset git@github.com:Mrooze-zeng/vue2-component-repo-preset.git:
 ERROR  Error: Basic authentication must be done with the `auth` option
Error: Basic authentication must be done with the `auth` option
    at normalizeArguments (/Users/mrooze/.config/yarn/global/node_modules/got/index.js:511:10)
    at Function.got.stream (/Users/mrooze/.config/yarn/global/node_modules/got/index.js:657:38)
    at module.exports (/Users/mrooze/.config/yarn/global/node_modules/download/index.js:85:21)
    at download (/Users/mrooze/.config/yarn/global/node_modules/download-git-repo/index.js:57:5)
    at /Users/mrooze/.config/yarn/global/node_modules/@vue/cli/lib/util/loadRemotePreset.js:26:5
    at new Promise (<anonymous>)
    at loadRemotePreset (/Users/mrooze/.config/yarn/global/node_modules/@vue/cli/lib/util/loadRemotePreset.js:25:9)
    at Creator.resolvePreset (/Users/mrooze/.config/yarn/global/node_modules/@vue/cli/lib/Creator.js:358:24)
    at Creator.create (/Users/mrooze/.config/yarn/global/node_modules/@vue/cli/lib/Creator.js:78:29)
    at create (/Users/mrooze/.config/yarn/global/node_modules/@vue/cli/lib/create.js:72:17)
```
