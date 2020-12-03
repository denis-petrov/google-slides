import {showNextSlide} from "../functions/showPresentation"

let timerId: any

export function slideShow(evt: any, timer: boolean) {
    let playBtn = document.getElementById('start_slide_show') as HTMLElement
    let stopBtn = document.getElementById('stop_slide_show') as HTMLElement
    if (timer) {
        playBtn.style.display = ''
        stopBtn.style.display = 'none'
        clearInterval(timerId)
    } else {
        playBtn.style.display = 'none'
        stopBtn.style.display = ''
        timerId = setInterval((evt) => {
            showNextSlide(evt)
        }, 3000)
    }
}