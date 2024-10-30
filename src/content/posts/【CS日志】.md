---
title: CS日志
published: 2024-10-29
description: ''
image: ''
tags: [CS心得]
category: ''
draft: false 
lang: ''
---
## 10.28 搭建博客 学mac基本配件和应用
## 10.29 配置iTerm2 
Link:  
https://sourabhbajaj.com/mac-setup/
https://qiita.com/ryamate/items/075c34fcf29d0889c15a

有时候https clone 不了：用ssh git clone可以成功

留档部分配置过程：（**fzf使用shell扩展，按照文档报错**）
不知道是否可行：
![1](/media/17291428769621/1.png)
![2](/media/17291428769621/2.png)
最后采用博客方法解决：
https://blog.csdn.net/weixin_34256074/article/details/88758143

## 10.30 侧边栏html编写

### 安装自动markdown侧边栏
#### GPT回答1
要让网站显示 Markdown 大纲，通常可以采用以下几种方法：

1. 使用 JavaScript Markdown 库

使用 JavaScript 库如 Marked、Showdown 或 markdown-it 可以解析 Markdown 文件并将其转换成 HTML。这些库非常适合在网页中嵌入 Markdown 大纲并动态生成 HTML。

步骤

	1.	安装 Markdown 解析库，例如 Marked。
	2.	编写 JavaScript 脚本，解析 Markdown 内容并插入到页面中。

示例代码：

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Markdown Outline</title>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
</head>
<body>
  <div id="content"></div>

  <script>
    // 假设你的 Markdown 内容是一个字符串
    const markdownContent = `
# 大纲标题
## 第一部分
一些内容...
## 第二部分
更多内容...
    `;

    // 将 Markdown 内容转换为 HTML 并插入到页面
    document.getElementById('content').innerHTML = marked.parse(markdownContent);
  </script>
</body>
</html>

2. 使用 Static Site Generators

如果你的网页是静态网站，可以使用 Jekyll、Hugo 或 Hexo 等生成器，这些工具可以自动将 Markdown 文件渲染成 HTML。

步骤

	1.	将 Markdown 文件放在特定目录中。
	2.	配置生成器的模板文件来引用大纲，并指定如何渲染 Markdown。

3. 使用 Markdown 支持的 Web 框架

一些前端框架如 VuePress 或 Docusaurus，直接支持 Markdown，你可以将大纲作为 Markdown 文件包含在项目中，框架会自动生成目录和 HTML 页面。

4. 使用服务器端解析

如果你使用的是 Node.js 或其他支持 Markdown 的服务器环境，可以在服务器端解析 Markdown 并将结果发送给前端。例如，使用 express-markdown 或 markdown-it 将 Markdown 文件渲染成 HTML。

步骤

	1.	安装 markdown-it：npm install markdown-it
	2.	在 Node.js 中编写代码，将 Markdown 文件解析成 HTML 并提供给前端。

const express = require('express');
const fs = require('fs');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

const app = express();

app.get('/outline', (req, res) => {
  const markdownContent = fs.readFileSync('./outline.md', 'utf8');
  const htmlContent = md.render(markdownContent);
  res.send(htmlContent);
});

app.listen(3000, () => console.log('Server is running on port 3000'));

通过这些方法，您可以在网页上显示 Markdown 格式的大纲内容。

#### GPT回答2：
在 Astro 中显示每个 Markdown 文件的侧边大纲，你可以使用 Astro 结合 @astrojs/mdx 插件和 JavaScript 来解析 Markdown 文件，提取标题并生成一个可点击的侧边大纲。这里是一个实现方法：

1. 安装必要的插件

使用 @astrojs/mdx 插件使 Astro 支持 Markdown 解析。
```zsh
npm install @astrojs/mdx
```
![](/img/jurnal/1.png)
![](/img/jurnal/2.png)

在 astro.config.mjs 文件中添加：

import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [mdx()]
});

2. 提取 Markdown 大纲

可以编写一个辅助函数，将 Markdown 文件的标题提取出来，生成大纲数据。例如，使用 Astro 的 remark 插件处理 Markdown 内容。

新建一个 utils/getHeadings.js 文件：

import { remark } from 'remark';
import remarkExtractHeadings from 'remark-extract-headings';

export async function getHeadings(markdown) {
  const result = await remark()
    .use(remarkExtractHeadings, { level: [1, 2, 3] }) // 设置要提取的标题级别
    .process(markdown);
  return result.data.headings.map((heading) => ({
    text: heading.value,
    level: heading.depth
  }));
}

3. 创建 Post 页面模板

在 src/pages/posts/[slug].astro 中设置每个帖子页面模板。可以使用 Astro 的 getStaticPaths 动态生成每个帖子页面。使用 getHeadings 函数来生成当前 Markdown 文本的侧边大纲。

---
import { getHeadings } from '../../utils/getHeadings';
import { MarkdownContent } from '@astrojs/mdx';

export async function getStaticPaths() {
  const posts = await Astro.glob('../posts/*.md');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { content: post.default, headings: await getHeadings(post.rawContent()) }
  }));
}

const { headings, content } = Astro.props;
---

<style>
  /* 简单的样式，用于展示大纲 */
  .sidebar {
    position: fixed;
    width: 200px;
    padding: 1rem;
    background-color: #f9f9f9;
    border-right: 1px solid #ddd;
  }
  .main-content {
    margin-left: 220px;
    padding: 1rem;
  }
</style>

<div class="sidebar">
  <h2>大纲</h2>
  <ul>
    {headings.map((heading) => (
      <li style={`margin-left: ${(heading.level - 1) * 10}px`}>
        <a href={`#${heading.text}`}>{heading.text}</a>
      </li>
    ))}
  </ul>
</div>

<div class="main-content">
  <MarkdownContent content={content} />
</div>

4. Markdown 内容自动生成 ID

为了让每个标题都可以被点击并跳转到对应位置，可以为标题自动生成 ID。可以在 utils/getHeadings.js 中添加这一步处理，也可以使用 CSS scroll-margin-top 让滚动停留在适当位置。

这样，侧边栏的 Markdown 大纲就会随着每个帖子内容的加载自动生成，并显示在浏览器页面的侧边。这个方法非常适合 Astro 项目中发布的每一个 Markdown 文件的内容页面展示。

### 安装nvm
要将下载的 nvm-master.zip 文件解压到 ~/.nvm 目录，您可以按照以下步骤进行操作：

1. 打开终端

如果您尚未打开终端，请打开它。

2. 导航到下载目录

使用以下命令切换到您的下载目录：

cd ~/Downloads

3. 解压 ZIP 文件

使用 unzip 命令解压文件。如果您的系统中未安装 unzip，可以通过 Homebrew 安装：

brew install unzip

然后，使用以下命令解压文件：

unzip nvm-master.zip

4. 移动解压后的文件

将解压后的文件夹移动到 ~/.nvm 目录：

mv nvm-master ~/.nvm

5. 配置环境变量

确保您的 shell 配置文件（如 ~/.bashrc 或 ~/.zshrc）中包含以下内容，以加载 nvm：

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

6. 重新加载配置

保存文件后，重新加载配置：

source ~/.bashrc  # 如果使用 bash
# 或
source ~/.zshrc   # 如果使用 zsh

7. 验证 nvm 是否安装成功

使用以下命令检查 nvm 是否安装成功：

nvm --version

如果一切顺利，您应该会看到 nvm 的版本号。如果有其他问题，请随时告诉我！

安装成功：
```zsh
# tilly @ tillydeMacBook-Pro in ~ [8:44:30]
$ nvm --version
0.40.1
```