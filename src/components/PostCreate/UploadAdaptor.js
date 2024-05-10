import { uploadFilesToS3 } from "../../apifetchers/fetcher";

class CustomUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file.then(file => new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('files', file); // Ensure that the key matches what the backend expects
            console.log(formData)
            uploadFilesToS3(formData).then(response => {
                console.log("Server response:", response); // 서버 응답 확인
                if (response && response.data && response.data.length > 0) {
                    resolve({ default: response.data[0] }); // 첫 번째 파일 URL을 사용
                } else {
                    reject('No files uploaded.');
                }
            }).catch(error => {
                reject(`Error: ${error.message || 'Unknown error'}`);
            });
        }));
    }
}

function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new CustomUploadAdapter(loader);
    };
}

export default CustomUploadAdapterPlugin;