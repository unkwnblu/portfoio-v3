"use client";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Italic, Essentials, Heading, Link, Paragraph, List } from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function CKEditorWrapper({ value, onChange }: Props) {
    return (
        <CKEditor
            editor={ClassicEditor}
            config={{
                licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3Nzk0OTQzOTksImp0aSI6ImFiZWViYzBiLTk3YzEtNDZmNy05MTE3LWJjODE4OGRkOWI0MyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiXSwiZmVhdHVyZXMiOlsiRFJVUCIsIkUyUCIsIkUyVyJdLCJ2YyI6IjA0MDNkYWE4In0.nDmBWqYL-x11MMH02MZfHG-PBpaG4qlufAlIBna0ebo9gMAxCWK0uCHefePMLSm4AsWPwOrJIunzB9YoV6m_-w',
                plugins: [Essentials, Bold, Italic, Heading, Link, Paragraph, List],
                toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'undo', 'redo'],
            }}
            data={value}
            onChange={(event, editor) => {
                const data = editor.getData();
                onChange(data);
            }}
        />
    );
}
