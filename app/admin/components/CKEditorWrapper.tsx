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
                licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NzM1MzI3OTksImp0aSI6ImQ5ZDEyODliLTZlNWUtNDYwNy04NmM0LWU2YWMxYWZmYWJlMyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjQ2MjkxYjhjIn0.QrM-AZ6-UeXvRRc53FHKsX1Bz_99LqH5MJFRe3Cq0abF144khyospGZ5-AotV6CtpVnNRKva8qZVZ9nH6cULFA',
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
