import React from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { createGlobalStyle } from 'styled-components';
import { colorMapping } from "../Typography";
import CustomUploadAdapterPlugin from "./UploadAdaptor";

const GlobalStyle = createGlobalStyle`
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 254px;
    
  }
  .ck.ck-placeholder {
    color: ${colorMapping.gray}; 
  }
`;

const CkeditorBox = ({ setContent, style }) => {
    return (
        <>
            <GlobalStyle />
            <div style={style}>
                <CKEditor
                    editor={ClassicEditor}
                    config={{
                        placeholder: "내용을 입력하세요...",
                        extraPlugins: [CustomUploadAdapterPlugin],
                    }}
                    data=""
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setContent(data);
                    }}  
                    onInit={(editor) => {
                        editor.editing.view.change((writer) => {
                            writer.setStyle(
                                "min-height",
                                "254px",
                                editor.editing.view.document.getRoot()
                            );
                        });
                    }}
                />
            </div>
        </>
    );
};

export default CkeditorBox;