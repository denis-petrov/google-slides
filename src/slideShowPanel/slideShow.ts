import {showNextSlide} from "../functions/showPresentation"

let timerId: any

export function slideShow(evt: any, timer: boolean) {
    let playBtn = document.getElementById('start-slide-show') as HTMLElement
    let stopBtn = document.getElementById('stop-slide-show') as HTMLElement
    if (timer) {
        playBtn.style.display = ''
        stopBtn.style.display = 'none'
        clearInterval(timerId)
    } else {
        playBtn.style.display = 'none'
        stopBtn.style.display = ''
        timerId = setInterval((evt) => {
            let isLastPage = showNextSlide(evt)
            if (isLastPage) {
                clearInterval(timerId)
                playBtn.style.display = ''
                stopBtn.style.display = 'none'
            }
        }, 3000)
    }
}