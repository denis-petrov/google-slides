import React from 'react'
import {setEditorNewPresentation} from '../stateManager/StateManager'

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

    const handleFileRead = () => {
        const content = fileReader.result
        if (typeof(content) === 'string') {
            setEditorNewPresentation(JSON.parse(content))
        }
    }

    if (e.target.files != null) {
        handleFileChosen(e.target.files[0])
    }
}
