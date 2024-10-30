import { remark } from 'remark';
import remarkHeadingId from 'remark-heading-id';
import { visit } from 'unist-util-visit';

export async function getHeadings(markdown) {
  const headings = [];

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
    .process(markdown);

  return headings;
}