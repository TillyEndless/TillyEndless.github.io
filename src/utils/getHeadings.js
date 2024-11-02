import { remark } from 'remark';
import remarkHeadingId from 'remark-heading-id';
import remarkHtml from 'remark-html';
import { visit } from 'unist-util-visit';

async function convertHtmlToMarkdown(html) {
  const markdown = await remark()
    .use(remarkHtml)
    .process(html);
  
  return markdown.toString();
}

function generateSlug(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
}

export async function getHeadings(content) {
  const headings = [];
  const markdownContent = (typeof content === 'string' && content.startsWith('<')) 
    ? await convertHtmlToMarkdown(content) 
    : content;

  await remark()
    .use(remarkHeadingId)
    .use(() => (tree) => {
      visit(tree, 'heading', (node) => {
        const text = node.children[0].value;
        const slug = generateSlug(text);
        
        headings.push({
          slug: slug,
          text: text,
          depth: node.depth,
        });
      });
    })
    .process(markdownContent);

  return headings;
}