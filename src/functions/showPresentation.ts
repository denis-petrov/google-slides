import {Simulate} from "react-dom/test-utils";

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
        slideMask.style.zIndex = '1000'
    }
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
        slideMask.style.zIndex = ''
    }
}