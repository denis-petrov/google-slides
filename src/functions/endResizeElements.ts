import {store} from "../store/store"

export function endResizeElements() {
    let editor = store.getState()
    editor.presentation.slides.forEach(s => {
        if (editor.selectionSlidesId.includes(s.id)) {
            let multipleSelection = document.getElementById('multiple-selection') as HTMLElement
            let selectionBorder = multipleSelection.children[0]
            selectionBorder.setAttribute('d', multipleSelection.getAttribute('data-old-d') as string)
        }
    })
}