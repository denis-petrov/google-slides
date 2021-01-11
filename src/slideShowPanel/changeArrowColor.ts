import {Editor} from "../entities/Editor"

export function changeArrowColor(editor: Editor) {
    let prevArrow = document.getElementById('show-prev-slide')
    let nextArrow = document.getElementById('show-next-slide')
    let playBtn = document.getElementById('start-slide-show')
    editor.presentation.slides.forEach(s => {
        if (s.id === editor.selectionSlidesId[0]) {
            if (editor.presentation.slides.indexOf(s) === 0) {
                if (prevArrow) {
                    prevArrow.style.color = '#8e8e8e'
                    prevArrow.style.cursor = 'default'
                }
            } else {
                if (prevArrow) {
                    prevArrow.style.color = '#fff'
                    prevArrow.style.cursor = 'pointer'
                }
            }

            if (editor.presentation.slides.indexOf(s) === editor.presentation.slides.length - 1) {
                if (nextArrow && playBtn) {
                    nextArrow.style.color = '#8e8e8e'
                    nextArrow.style.cursor = 'default'
                    playBtn.style.color = '#8e8e8e'
                    playBtn.style.cursor = 'default'
                }
            } else {
                if (nextArrow && playBtn) {
                    nextArrow.style.color = '#fff'
                    nextArrow.style.cursor = 'pointer'
                    playBtn.style.color = '#fff'
                    playBtn.style.cursor = 'pointer'
                }
            }
        }
    })
}