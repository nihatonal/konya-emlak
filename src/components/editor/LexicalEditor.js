import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $getRoot, $getSelection } from "lexical";

const theme = {
    paragraph: "mb-2",
};

const editorConfig = {
    namespace: "MyEditor",
    theme,
    onError(error) {
        throw error;
    },
};

export default function LexicalEditor({ onChange }) {
    return (
        <LexicalComposer initialConfig={editorConfig}>
            <div className="border rounded-lg p-2 min-h-[150px]">
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable className="outline-none min-h-[100px]" />
                    }
                    placeholder={<div className="text-gray-400">Mesaj içeriği girin...</div>}
                />
                <HistoryPlugin />
                <OnChangePlugin onChange={(editorState) => {
                    editorState.read(() => {
                        const root = $getRoot();
                        onChange(root.getTextContent());
                    });
                }} />
            </div>
        </LexicalComposer>
    );
}
