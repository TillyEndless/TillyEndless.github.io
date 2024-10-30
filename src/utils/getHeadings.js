import { remark } from 'remark';
import remarkExtractHeadings from 'remark-extract-headings';

// 生成一个标题 ID 的辅助函数
function generateId(text) {
  return text
    .toLowerCase()                 // 转为小写
    .replace(/\s+/g, '-')          // 将空格替换为短横线
    .replace(/[^\w\-]+/g, '')      // 移除特殊字符
    .replace(/--+/g, '-')          // 替换多个短横线为一个
    .replace(/^-+|-+$/g, '');      // 移除开头和结尾的短横线
}

export async function getHeadings(markdown) {
  const result = await remark()
    .use(remarkExtractHeadings, { level: [1, 2, 3] }) // 设置要提取的标题级别
    .process(markdown);

  // 提取标题并为每个标题生成 ID
  return result.data.headings.map((heading) => ({
    text: heading.value,
    level: heading.depth,
    id: generateId(heading.value) // 为每个标题生成 ID
  }));
}

