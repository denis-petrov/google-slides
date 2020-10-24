import React from 'react'
import {setEditor} from '../StateManager'

export {
    openPresentationFromPc
}

function openPresentationFromPc(e: React.ChangeEvent<HTMLInputElement>) {
    let fileReader: FileReader

    const handleFileChosen = (file: File) => {
        fileReader = new FileReader()
        fileReader.onloadend = handleFileRead
        fileReader.readAsText(file)
    }

    const handleFileRead = (e: ProgressEvent<FileReader>) => {
        const content = fileReader.result
        if (typeof(content) === 'string') {
            console.log(JSON.parse(content))
            setEditor(JSON.parse(content), false)
        }
    }

    if (e.target.files != null) {
        handleFileChosen(e.target.files[0])
    }
}
