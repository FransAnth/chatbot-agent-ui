import { marked } from "marked";

interface IMarkdownParser {
  markdown: string;
}

const MarkdownParser = ({ markdown }: IMarkdownParser) => {
  const html = marked(markdown);

  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
};

export default MarkdownParser;
