import remarkGfm from "remark-gfm";

import ReactMarkdown from "react-markdown";
export const CustomReactMarkdown = ({ text }: { text: string }) => {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
        >{text}</ReactMarkdown>
    )
}
