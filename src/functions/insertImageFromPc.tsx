import React, {Dispatch} from 'react'
import {DEFAULT_IMAGE, MAX_BASE64_LENGTH} from "../entities/Constants"
import {deepCopy} from "deep-copy-ts"
import {imageInitAfterOnload} from "./imageInitAfterOnload"
import {ADD_TO_BACKGROUND} from "../store/actionTypes";

const gifFrames = require('gif-frames')

export function insertImageFromPc(e: React.ChangeEvent<HTMLInputElement>, type: string, dispatch: Dispatch<any>) {
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
                    if (copyImage.link.length > MAX_BASE64_LENGTH) {
                        alert("The size of the selected image must not exceed 512KB.")
                        return null;
                    }

                    if (file.type === 'image/gif' && type === ADD_TO_BACKGROUND) {
                        gifFrames({ url: copyImage.link, frames: 0, outputType: 'canvas' })
                            .then(function (frameData: Array<any>) {
                                let canvas = frameData[0].getImage()
                                copyImage.link = canvas.toDataURL('img/png')
                                dispatch({type: type, payload: copyImage})
                            })
                    } else {

                        dispatch({type: type, payload: copyImage})
                    }
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
