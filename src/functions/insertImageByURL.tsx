import React from 'react'
import {DEFAULT_IMAGE} from '../entities/Constants'
import {deepCopy} from "deep-copy-ts"
import {imageInitAfterOnload} from "./imageInitAfterOnload"
import {dispatch} from "../stateManager/StateManager"

export function insertImageByURL<F extends Function>(URL: string, fn: F) {
    let copyImage = deepCopy(DEFAULT_IMAGE)
    let img = new Image()

    img.setAttribute('src', URL)
    img.onload = () => {
        copyImage = imageInitAfterOnload(img, copyImage)
        copyImage.link = URL
        dispatch(fn, copyImage)
    }
}


/*const corsDef = 'https://cors-anywhere.herokuapp.com/'

let xhr = new XMLHttpRequest()
xhr.onload = function() {
    let fileReader = new FileReader()
    fileReader.onloadend = function() {
        console.log(fileReader.result)
        if (fileReader.result != null) {
            //addSomeElement(getImage(DEFAULT_IMAGE, fileReader.result as string))
        }
    }
    fileReader.readAsDataURL(xhr.response)
}
xhr.open('GET', corsDef + URL)
xhr.responseType = 'blob'
xhr.send()*/
