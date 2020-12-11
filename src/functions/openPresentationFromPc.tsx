import React, {Dispatch} from 'react'

export function openPresentationFromPc(e: React.ChangeEvent<HTMLInputElement>, dispatch: Dispatch<any>) {
    let fileReader: FileReader

    const handleFileChosen = (file: File) => {
        fileReader = new FileReader()
        fileReader.onloadend = handleFileRead
        fileReader.readAsText(file)
    }

    const handleFileRead = () => {
        const content = fileReader.result
        if (typeof(content) === 'string') {
            dispatch({type: 'SET_EDITOR', payload: JSON.parse(content)})
        }
    }

    if (e.target.files != null) {
        handleFileChosen(e.target.files[0])
    }
}
