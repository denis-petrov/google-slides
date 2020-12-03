import {getSlideIndex} from "./getSlideIndex"
import {getEditor} from "../stateManager/StateManager"
import {SelectSlide} from "./SelectSlide"

let timerId: NodeJS.Timeout

export let isShowCurrentlyPresentation: boolean

export function changeSlideSize() {
    let workspace = document.getElementsByClassName('workspace')[0] as HTMLElement
    if (workspace) {
        let windowWidth = window.innerWidth
        let windowHeight = window.innerHeight
        let slideArea = document.getElementById('slide-area') as HTMLElement
        if (windowWidth / windowHeight > 16 / 9) {
            workspace.style.width = 'calc(100vh / 9 * 16)'
            workspace.style.height = '100vh'
            slideArea.style.width = '100vw'
        } else {
            workspace.style.width = '100vw'
            workspace.style.height = 'calc(100vw / 16 * 9)'
            slideArea.style.height = '100vh'
        }
    }
}

export function showPresentation() {
    let wrapper = document.getElementsByClassName('wrapper')[0] as HTMLElement
    if (wrapper) {
        wrapper.style.display = 'block'
        if (wrapper.childNodes[0]) {
            let nav = wrapper.childNodes[0] as HTMLElement
            nav.style.display = 'none'
        }
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
}

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
        slideArea.style.width = ''
        slideArea.style.height = ''
    }

    let slideMask = document.getElementById('slide-mask') as HTMLElement
    if (slideMask) {
        slideMask.style.visibility = ''
    }

    changeTextPlaceholder('Insert text here')

    document.documentElement.style.cursor = ''
    clearTimeout(timerId)

    isShowCurrentlyPresentation = false
}

export function showLastSlide(evt: any) {
    let slide = document.getElementsByClassName('workspace')[0]
    if (slide) {
        let slideIndex = getSlideIndex(slide)
        let editor = getEditor()
        if (slideIndex - 1 >= 0) {
            SelectSlide(evt, editor.presentation.slides[slideIndex - 1].id)
        }
    }

    if (isShowCurrentlyPresentation) {
        changeTextPlaceholder('')
    }
}

export function showNextSlide(evt: any) {
    let slide = document.getElementsByClassName('workspace')[0]
    if (slide) {
        let slideIndex = getSlideIndex(slide)
        let editor = getEditor()
        if (slideIndex + 1 < editor.presentation.slides.length) {
            SelectSlide(evt, editor.presentation.slides[slideIndex + 1].id)
        }
    }

    if (isShowCurrentlyPresentation) {
        changeTextPlaceholder('')
    }
}


let slidePanelTimerId: any

export function showSlideShowPanel(event: any) {
    if (isShowCurrentlyPresentation) {
        let presentationPanel = document.getElementsByClassName('presentation_panel')[0] as HTMLElement
        if (slidePanelTimerId) {
            clearTimeout(slidePanelTimerId)
        }

        clearTimeout(timerId)
        if (window.innerHeight - event.clientY <= 100) {
            presentationPanel.style.opacity = '1'
        } else {
            slidePanelTimerId = setTimeout(() => presentationPanel.style.opacity = '0', 1500)
            timerId = setTimeout(() => document.documentElement.style.cursor = 'none', 2000)
        }
    }
}

export function changeTextPlaceholder(placeholder: string) {
    let texts = document.getElementsByTagName('p')
    for (let i = 0; i < texts.length; i++) {
        if (texts[i].getAttribute('data-path-id')) {
            texts[i].setAttribute('data-placeholder', placeholder)
        }
    }
}