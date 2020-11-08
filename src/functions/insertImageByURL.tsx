import React from 'react'
import {addSomeElement} from './addSomeElement'
import {IMAGE} from '../entities/Constants'


export function insertImageByURL(URL: string) {
    const corsDef = 'https://cors-anywhere.herokuapp.com/'

    let xhr = new XMLHttpRequest()
    xhr.onload = function() {
        let fileReader = new FileReader()
        fileReader.onloadend = function() {
            console.log(fileReader.result)
            if (fileReader.result != null) {
                addSomeElement(IMAGE(fileReader.result))
            }
        }
        fileReader.readAsDataURL(xhr.response)
    }
    xhr.open('GET', corsDef + URL)
    xhr.responseType = 'blob'
    xhr.send()
}
