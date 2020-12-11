import {showNextSlide} from "../functions/showPresentation"
import {Dispatch} from "react"
import {Editor} from "../entities/Editor"

let timerId: any

export function slideShow(editor: Editor, dispatch: Dispatch<any>, evt: any, timer: boolean) {
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
            let isLastPage = showNextSlide(editor, dispatch)
            if (isLastPage) {
                clearInterval(timerId)
                playBtn.style.display = ''
                stopBtn.style.display = 'none'
            }
        }, 3000)
    }
}