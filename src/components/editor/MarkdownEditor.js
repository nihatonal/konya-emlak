// components/adminPage/MarkdownEditor.js
import React, { useMemo, useCallback } from "react"
import { createEditor, Text } from "slate"
import { Slate, Editable, withReact } from "slate-react"
import { withHistory } from "slate-history"
import Prism from "prismjs"
import "prismjs/components/prism-markdown"
import { css } from "@emotion/css"

const MarkdownEditor = () => {
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])

    const decorate = useCallback(([node, path]) => {
        const ranges = []
        if (!Text.isText(node)) return ranges

        const getLength = (token) => {
            if (typeof token === "string") return token.length
            if (typeof token.content === "string") return token.content.length
            return token.content.reduce((l, t) => l + getLength(t), 0)
        }

        const tokens = Prism.tokenize(node.text, Prism.languages.markdown)
        let start = 0

        for (const token of tokens) {
            const length = getLength(token)
            const end = start + length
            if (typeof token !== "string") {
                ranges.push({
                    [token.type]: true,
                    anchor: { path, offset: start },
                    focus: { path, offset: end },
                })
            }
            start = end
        }

        return ranges
    }, [])

    const renderLeaf = useCallback(({ attributes, children, leaf }) => {
        let classNames = ""

        if (leaf.bold) classNames += " font-bold"
        if (leaf.italic) classNames += " italic"
        if (leaf.underlined) classNames += " underline"
        if (leaf.blockquote) classNames += " border-l-4 pl-2 text-gray-500 italic"
        if (leaf.code) classNames += " bg-gray-100 px-1 font-mono text-sm"
        if (leaf.title) classNames += " text-xl font-bold mt-4 mb-2 block"
        if (leaf.list) classNames += " pl-4 list-disc"
        if (leaf.hr) classNames += " border-b-2 border-gray-300 my-2 block"

        return (
            <span {...attributes} className={classNames}>
                {children}
            </span>
        )
    }, [])

    return (
        <Slate editor={editor} initialValue={initialValue}>
            <Editable
                placeholder="Markdown yazmaya başlayın..."
                decorate={decorate}
                renderLeaf={renderLeaf}
                className="min-h-[200px] p-4 border border-gray-300 rounded-md bg-white focus:outline-none"
            />
        </Slate>
    )
}

const initialValue = [
    {
        type: "paragraph",
        children: [
            {
                text: "**Markdown** vurgulama ile zengin metin düzenleyici (örneğin: _italic_, `code`, > blockquote)",
            },
        ],
    },
]

export default MarkdownEditor
