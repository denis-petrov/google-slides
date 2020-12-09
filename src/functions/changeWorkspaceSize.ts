export function changeWorkspaceSize() {
    let windowWidth = window.innerWidth
    let windowHeight = window.innerHeight
    let workspace = document.getElementsByClassName('workspace')[0] as HTMLElement
    let slideArea = document.getElementById('slide-area') as HTMLElement
    let slideAreaWidth = slideArea.getBoundingClientRect().width
    let slideAreaHeight = slideArea.getBoundingClientRect().height
    const minWidth = 1401
    const minHeight = 822
    if (windowWidth <= minWidth || windowHeight <= minHeight) {
        if (workspace && slideArea) {
            if (slideAreaWidth / slideAreaHeight > 16 / 9) {
                workspace.style.height = `${slideAreaHeight - 40}px`
                workspace.style.width = `calc(${slideAreaHeight - 40}px / 9 * 16)`
            } else {
                workspace.style.width = `${slideAreaWidth - 40}px`
                workspace.style.height = `calc(${slideAreaWidth - 40}px / 16 * 9)`
            }
        }
    } else {
        workspace.style.width = ''
        workspace.style.height = ''
    }
}