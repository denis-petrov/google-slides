import React from 'react'
import {addSomeElement} from "./addSomeElement"
import {DEFAULT_IMAGE} from "../entities/Constants"
import {deepCopy} from "deep-copy-ts";


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
                    let imgWidth = 0
                    let imgHeight = 0
                    if (img.width >= img.height) {
                        if(img.width > 1000) {
                            imgWidth = 100
                            imgHeight =
                        } else {
                            imgWidth = img.width/10
                            imgHeight = img.height/10
                        }
                    }
                    copyImage.bottomRightPoint.x = imgWidth
                    copyImage.bottomRightPoint.y = imgHeight
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
