import {Editor} from "../entities/Editor"
import {changeArrowColor} from "../slideShowPanel/changeArrowColor"
import {changeTextPlaceholder} from "../slideShowPanel/changeTextPlaceholder"
import {changeSlideSize} from "../slideShowPanel/changeSlideSize"
import {store} from "../store/store";

let timerId: NodeJS.Timeout

export function getTimerId() {
    return timerId
}

export function setTimerId(newTime: NodeJS.Timeout) {
    timerId = newTime
}

let isShowCurrentlyPresentation: boolean

export function getIsShowCurrentlyPresentation() {
    return isShowCurrentlyPresentation
}

export function setIsShowCurrentlyPresentation(newValue: boolean) {
    isShowCurrentlyPresentation = newValue
}


export function showPresentation(editor: Editor) {
    let wrapper = document.getElementsByClassName('wrapper')[0] as HTMLElement
    if (wrapper) {
        wrapper.style.display = 'block'
        if (wrapper.childNodes[0]) {
            let nav = wrapper.childNodes[0] as HTMLElement
            nav.style.display = 'none'
        }
    }

    let slideArea = document.getElementById('slide-area')
    if (slideArea) {
        slideArea.style.backgroundColor = '#000'
    }

    let mainBlock = document.getElementsByClassName('main-block')[0] as HTMLElement
    if (mainBlock) {
        mainBlock.style.display = 'block'
    }

    let sidebar = document.getElementsByClassName('sidebar')[0] as HTMLElement
    if (sidebar) {
        sidebar.style.display = 'none'
    }

    let root = document.getElementById('root') as HTMLElement
    if (root) {
        root.style.backgroundColor = '#222222'
    }

    changeSlideSize()

    let slideMask = document.getElementById('slide-mask') as HTMLElement
    if (slideMask) {
        slideMask.style.visibility = 'visible'
    }

    changeTextPlaceholder('')
    timerId = setTimeout(() => document.documentElement.style.cursor = 'none', 2000)

    isShowCurrentlyPresentation = true
    changeArrowColor(store.getState())
}