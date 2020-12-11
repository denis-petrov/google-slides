import {store} from "../stateManager/StateManager"

export function moveSlides(event: any) {
    let isMoveSlides = false
    let editor = store.getState()
    editor.presentation.slides.map(s => {
        if (editor.selectionSlidesId.includes(s.id)) {
            let selectedSlides = []
            for (let i = 0; i < editor.selectionSlidesId.length; i++) {
                selectedSlides.push(document.getElementById(editor.selectionSlidesId[i]))
            }

            let itSelectedSlides = []
            for (let i = 0; i < selectedSlides.length; i++) {
                let slide = selectedSlides[i]
                if (slide) {
                    itSelectedSlides.push(
                        event.target === selectedSlides[i]
                        || (selectedSlides[i] as HTMLElement).contains(event.target as Node)
                    )
                }
            }

            if (itSelectedSlides.includes(true)) {
                isMoveSlides = true
            }
        }
    })

    return isMoveSlides
}