export function changeSlideSize() {
    let workspace = document.getElementsByClassName('workspace')[0] as HTMLElement
    if (workspace) {
        let windowWidth = window.innerWidth
        let windowHeight = window.innerHeight
        let slideArea = document.getElementById('slide-area') as HTMLElement
        workspace.style.overflow = 'hidden'
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