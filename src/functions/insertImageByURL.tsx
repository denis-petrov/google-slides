import {Dispatch} from 'react'
import {DEFAULT_IMAGE, MAX_BASE64_LENGTH} from '../entities/Constants'
import {deepCopy} from "deep-copy-ts"
import {imageInitAfterOnload} from "./imageInitAfterOnload"
import {ADD_TO_BACKGROUND} from "../store/actionTypes";

const gifFrames = require('gif-frames')

export function insertImageByURL(URL: string, type: string, dispatch: Dispatch<any>) {
    let copyImage = deepCopy(DEFAULT_IMAGE)
    let img = new Image()

    img.setAttribute('src', URL)
    img.onload = async () => {
        copyImage = imageInitAfterOnload(img, copyImage)
        copyImage.link = URL

        let gifMatches = URL.match(/.gif\b/)
        let base64 = URL

        const corsDef = 'https://cors-anywhere.herokuapp.com/'
        let xhr = new XMLHttpRequest()
        xhr.onload = function() {
            let fileReader = new FileReader()
            fileReader.onloadend = function() {
                if (fileReader.result != null) {
                    base64 = fileReader.result as string
                    if (base64.length > MAX_BASE64_LENGTH) {
                        alert("The size of the selected image must not exceed 512KB.")
                        return null;
                    }
                    if (type === ADD_TO_BACKGROUND && gifMatches && gifMatches.length > 0) {
                        gifFrames({ url: base64, frames: 0, outputType: 'canvas' })
                            .then(function (frameData: Array<any>) {
                                let canvas = frameData[0].getImage()
                                copyImage.link = canvas.toDataURL('img/png')
                                dispatch({type: type, payload: copyImage})
                            })
                    } else {
                        copyImage.link = base64
                        dispatch({type: type, payload: copyImage})
                    }
                }
            }
            fileReader.readAsDataURL(xhr.response)
        }
        xhr.open('GET', corsDef + URL)
        xhr.responseType = 'blob'
        xhr.send()
    }
}
