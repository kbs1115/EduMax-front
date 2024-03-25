import React from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { createGlobalStyle } from 'styled-components';
import { colorMapping } from "../Typography";

const GlobalStyle = createGlobalStyle`
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 254px;
  }
  .ck.ck-placeholder {
    color: ${colorMapping.gray}; 
  }
`;

const Ckeditor = ({ setContent }) => {

    return (
        <>
            <GlobalStyle />
            <CKEditor
                editor={ClassicEditor}
                config={{
                    placeholder: "내용을 입력하세요...",
                }}
                data=""
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data); // Update content state in parent
                }}
                onInit={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    // console.log("Editor is ready to use!", editor);
                    editor.editing.view.change((writer) => {
                        writer.setStyle(
                            "min-height",
                            "254px",
                            editor.editing.view.document.getRoot()
                        );
                    });
                }}
            />
        </>
    )
};

export default Ckeditor;