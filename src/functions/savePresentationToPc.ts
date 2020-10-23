import {Editor} from '../entities/Editor'


export {
    savePresentationToPc
}

function savePresentationToPc(editor: Editor, fileType: string): void {
    const fileName = editor.presentation.name + '.' + fileType;
    let file = new Blob([JSON.stringify(editor)], {type: fileType});
    if (window.navigator.msSaveOrOpenBlob)
        window.navigator.msSaveOrOpenBlob(file, fileName);
    else {
        let a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}