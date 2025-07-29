import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TinyEditor({ value, onChange }) {
    return (
        <Editor
            apiKey="no-api-key" // Gerekirse TinyMCE'den alınır
            value={value}
            init={{
                height: 300,
                menubar: false,
                plugins: ["link", "table", "lists", "code"],
                toolbar:
                    "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link code",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={(content) => onChange(content)}
        />
    );
}
