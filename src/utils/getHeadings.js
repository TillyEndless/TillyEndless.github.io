import { remark } from 'remark';
import remarkHeadingId from 'remark-heading-id';
import remarkHtml from 'remark-html'; // 导入 remark-html 库
import { visit } from 'unist-util-visit';

// 将 HTML 转换为 Markdown
async function convertHtmlToMarkdown(html) {
  const markdown = await remark()
    .use(remarkHtml)
    .process(html);
  
  return markdown.toString();
}

export async function getHeadings(content) {
  const headings = [];

  // 确保 content 是字符串并判断内容是 HTML 格式还是 Markdown 格式
  const markdownContent = (typeof content === 'string' && content.startsWith('<')) 
    ? await convertHtmlToMarkdown(content) 
    : content;

  await remark()
    .use(remarkHeadingId)
    .use(() => (tree) => {
      visit(tree, 'heading', (node) => {
        headings.push({
          text: node.children[0].value,
          level: node.depth,
          id: node.data.id || `heading-${headings.length}` // 处理可能缺少 id 的情况
        });
      });
    })
    .process(markdownContent);

  return headings;
}