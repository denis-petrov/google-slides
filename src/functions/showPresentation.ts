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

    document.documentElement.requestFullscreen()

    let workspace = document.getElementsByClassName('workspace')[0] as HTMLElement
    if (workspace) {
        workspace.style.width = '100vw'
        workspace.style.height = '100vh'
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
        workspace.style.width = ''
        workspace.style.height = ''
    }
}