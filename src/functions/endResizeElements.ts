import {store} from "../store/store"

export function endResizeElements(payload: any) {
    let editor = store.getState()
    editor.presentation.slides.map(s => {
        if (editor.selectionSlidesId.includes(s.id)) {
            let multipleSelection = document.getElementById('multiple-selection') as HTMLElement
            let selectionBorder = multipleSelection.children[0]
            selectionBorder.setAttribute('d', multipleSelection.getAttribute('oldD') as string)
        }
    })
}