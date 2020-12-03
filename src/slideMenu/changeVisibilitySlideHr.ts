import {Editor} from '../entities/Editor'
import {clearAllSlideHr} from "./clearAllSlideHr"

export function changeVisibilitySlideHr(editor: Editor, payload: any): void {
    clearAllSlideHr()
    let shift = payload.shiftY

    let startSlideId = payload.startSlideId
    let endSlideId = payload.endSlideId

    if ((shift <= 95) && (shift >= 5) && (startSlideId != endSlideId)) {
        let startSlide = editor.presentation.slides.filter((slide) => slide.id === startSlideId)[0]
        let startSlidePosition = editor.presentation.slides.indexOf(startSlide)

        let endSlide = editor.presentation.slides.filter((slide) => slide.id === endSlideId)[0]
        let endSlidePosition = editor.presentation.slides.indexOf(endSlide)

        if (startSlidePosition < endSlidePosition) {
            if (shift > 50) {
                let slideHr = document.getElementById('slide_hr_after' + endSlideId)
                if (slideHr != null) {
                    slideHr.style.visibility = 'visible'
                }
            } else {
                let slideHr = document.getElementById('slide_hr_before' + endSlideId)
                if (slideHr != null) {
                    slideHr.style.visibility = 'visible'
                }
            }
        } else {
            if (shift > 50) {
                let slideHr = document.getElementById('slide_hr_after' + endSlideId)
                if (slideHr != null) {
                    slideHr.style.visibility = 'visible'
                }
            } else {
                let slideHr = document.getElementById('slide_hr_before' + endSlideId)
                if (slideHr != null) {
                    slideHr.style.visibility = 'visible'
                }
            }
        }
    }
}