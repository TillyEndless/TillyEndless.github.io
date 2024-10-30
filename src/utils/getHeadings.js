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
