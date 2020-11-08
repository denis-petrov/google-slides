import React from 'react'
import {addSomeElement} from "./addSomeElement"
import {getImage, DEFAULT_IMAGE} from "../entities/Constants"


export function insertImageFromPc(e: React.ChangeEvent<HTMLInputElement>) {
    let fileReader: FileReader

    const handleFileChosen = (file: File) => {
        fileReader = new FileReader()

        fileReader.readAsDataURL(file)
        fileReader.onload = function () {
            if (fileReader.result != null) {
                addSomeElement(getImage(DEFAULT_IMAGE, fileReader.result as string))
            }
        }
        fileReader.onerror = function (error) {
            console.log('Error: ', error)
        }
    }

    if (e.target.files != null) {
        handleFileChosen(e.target.files[0])
    }
}
