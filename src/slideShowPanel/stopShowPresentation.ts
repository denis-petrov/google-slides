import {changeTextPlaceholder} from "./changeTextPlaceholder";
import {getTimerId, setIsShowCurrentlyPresentation} from "../functions/showPresentation"

export function stopShowPresentation() {
    let wrapper = document.getElementsByClassName('wrapper')[0] as HTMLElement
    if (wrapper) {
        wrapper.style.display = 'grid'
        if (wrapper.childNodes[0]) {
            let nav = wrapper.childNodes[0] as HTMLElement
            nav.style.display = 'block'
        }
    }

    let mainBlock = document.getElementsByClassName('main-block')[0] as HTMLElement
    if (mainBlock) {
        mainBlock.style.display = 'grid'
    }

    let sidebar = document.getElementsByClassName('sidebar')[0] as HTMLElement
    if (sidebar) {
        sidebar.style.display = 'block'
    }

    let root = document.getElementById('root') as HTMLElement
    if (root) {
        root.style.backgroundColor = '#FFFFFF'
    }

    let workspace = document.getElementsByClassName('workspace')[0] as HTMLElement
    if (workspace) {
        let slideArea = document.getElementById('slide-area') as HTMLElement
        workspace.style.width = ''
        workspace.style.height = ''
        workspace.style.overflow = ''
        slideArea.style.width = ''
        slideArea.style.height = ''
    }

    let slideMask = document.getElementById('slide-mask') as HTMLElement
    if (slideMask) {
        slideMask.style.visibility = ''
    }

    changeTextPlaceholder('Insert text here')

    document.documentElement.style.cursor = ''
    clearTimeout(getTimerId())

    setIsShowCurrentlyPresentation(false)
}