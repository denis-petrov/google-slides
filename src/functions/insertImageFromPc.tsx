import React from 'react'
import {DEFAULT_IMAGE} from "../entities/Constants"
import {deepCopy} from "deep-copy-ts"
import {imageInitAfterOnload} from "./imageInitAfterOnload"
import {dispatch} from "../stateManager/StateManager"


export function insertImageFromPc<F extends Function>(e: React.ChangeEvent<HTMLInputElement>, fn: F) {
    let fileReader: FileReader

    const handleFileChosen = (file: File) => {
        fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = function () {
            if (fileReader.result != null) {
                let copyImage = deepCopy(DEFAULT_IMAGE)
                let img = new Image()
                img.setAttribute('src', fileReader.result as string)
                img.onload = () => {
                    copyImage = imageInitAfterOnload(img, copyImage)
                    copyImage.link = fileReader.result as string
                    dispatch(fn, copyImage)
                }
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
