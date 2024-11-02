// src/utils/fetchMarkdown.js

import fs from 'fs';
import path from 'path';
import { marked } from 'marked'; // 确保安装了 marked 库

export async function fetchMarkdownContent(filePath) {
  try {
    // 获取文件的绝对路径
    const absolutePath = path.resolve(filePath);
    
    // 读取 Markdown 文件
    const content = await fs.promises.readFile(absolutePath, 'utf-8');

    // 解析 Markdown 内容为 HTML
    const htmlContent = marked(content);

    // 提取标题
    const titleMatch = content.match(/^#\s+(.*)$/m); // 假设第一个 # 代表文章标题
    const title = titleMatch ? titleMatch[1] : 'Untitled';

    return { title, content: htmlContent }; // 返回标题和 HTML 内容
  } catch (error) {
    console.error(`Error fetching markdown content from ${filePath}:`, error);
    return { title: 'Error', content: '<p>Error loading content.</p>' };
  }
}