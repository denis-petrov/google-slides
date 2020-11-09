import React from 'react'
import {addSomeElement} from "./addSomeElement"
import {DEFAULT_IMAGE} from "../entities/Constants"
import {deepCopy} from "deep-copy-ts";
import {imageInitAfterOnload} from "./imageInitAfterOnload";


export function insertImageFromPc(e: React.ChangeEvent<HTMLInputElement>) {
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
                    addSomeElement(copyImage)
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
