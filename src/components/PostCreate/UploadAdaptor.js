class CustomUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file.then(file => new Promise((resolve, reject) => {
            const data = new FormData();
            data.append('upload', file);

            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'YOUR_SERVER_ENDPOINT', true);     // 아직 서버와 연결안함
            xhr.responseType = 'json';

            xhr.onload = () => {
                if (xhr.status === 200 && xhr.response) {
                    resolve({ default: xhr.response.url });
                } else {
                    reject(`Error: ${xhr.response ? xhr.response.message : 'Unknown error'}`);
                }
            };

            xhr.onerror = () => reject('Network error.');
            xhr.send(data);
        }));
    }
}

function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new CustomUploadAdapter(loader);
    };
}

export default CustomUploadAdapterPlugin;