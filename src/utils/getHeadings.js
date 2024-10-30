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

// 生成 slug 函数
function generateSlug(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
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
        const text = node.children[0].value;
        const slug = generateSlug(text); // 生成 slug

        headings.push({
          slug: slug, // 添加 slug 属性
          text: text,
          depth: node.depth,
        });
      });
    })
    .process(markdownContent);

  return headings;
}