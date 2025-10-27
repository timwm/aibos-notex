// import type { Editor } from "@tiptap/core";
// import { useState } from "react";

// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

// export function MarkdownInput({
//   content,
//   // onUpdate,
//   editor,
// }: {
//   content: string;
//   onUpdate: (value: string) => void;
//   editor: Editor | null;
// }) {
//   const [markdownInput] = useState(content);
//   const [, setError] = useState<string | null>(null);
//   const parseMarkdown = () => {
//     if (!editor || !editor.markdown) {
//       setError("Editor or MarkdownManager not available");

//       return;
//     }

//     try {
//       setError(null);
//       editor.commands.setContent(markdownInput, { contentType: "markdown" });
//     } catch (err) {
//       setError(
//         `Error parsing markdown: ${err instanceof Error ? err.message : String(err)}`,
//       );
//     }
//   };

//   const getEditorAsMarkdown = () => {
//     if (!editor) {
//       return "";
//     }

//     try {
//       return editor.getMarkdown();
//     } catch {
//       return editor.getText();
//     }
//   };

//   return (
//     <div className="">
//       <SyntaxHighlighter language="markdown" style={dark}>
//         {markdownInput}
//       </SyntaxHighlighter>
//       <button
//         disabled={!editor || !markdownInput.trim()}
//         type="button"
//         onClick={parseMarkdown}
//       >
//         Preview Markdown
//       </button>
//     </div>
//   );
// }
