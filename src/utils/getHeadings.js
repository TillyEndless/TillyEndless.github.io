import { remark } from 'remark';
import remarkHeadingId from 'remark-heading-id';

export async function getHeadings(markdown) {
  const headings = [];

  await remark()
    .use(remarkHeadingId)
    .use(() => (tree) => {
      visit(tree, 'heading', (node) => {
        headings.push({
          text: node.children[0].value,
          level: node.depth,
          id: node.data.id // 如果你使用了 remark-heading-id
        });
      });
    })
    .process(markdown);

  return headings;
}

