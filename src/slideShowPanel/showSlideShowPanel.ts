import {getIsShowCurrentlyPresentation, getTimerId, setTimerId} from "../functions/showPresentation"

let slidePanelTimerId: any

export function showSlideShowPanel(event: any) {
    if (getIsShowCurrentlyPresentation()) {
        let presentationPanel = document.getElementsByClassName('presentation_panel')[0] as HTMLElement
        if (slidePanelTimerId) {
            clearTimeout(slidePanelTimerId)
        }

        clearTimeout(getTimerId())
        if (window.innerHeight - event.clientY <= 100) {
            presentationPanel.style.opacity = '1'
        } else {
            slidePanelTimerId = setTimeout(() => presentationPanel.style.opacity = '0', 1500)
            setTimerId(setTimeout(() => document.documentElement.style.cursor = 'none', 2000))
        }
    }
}