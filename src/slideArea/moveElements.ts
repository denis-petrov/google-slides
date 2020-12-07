import {getEditor} from "../stateManager/StateManager"

export function moveElements(event: any) {
    let isMoveElements = false
    let editor = getEditor()
    editor.presentation.slides.map(s => {
        if (editor.selectionSlidesId.includes(s.id)) {
            let selectedElements = []
            for (let i = 0; i < s.selectionElementsId.length; i++) {
                selectedElements.push(document.getElementById(s.selectionElementsId[i]))
            }

            let itsSelectedElements = []
            for (let i = 0; i < selectedElements.length; i++) {
                let element = selectedElements[i]
                if (element) {
                    if (element.tagName === 'P') {
                        let parent = element.parentNode as HTMLElement
                        let shiftX = event.pageX - element.getBoundingClientRect().left
                        let shiftY = event.pageY - element.getBoundingClientRect().top
                        let parentSize = {
                            width: parent.getBoundingClientRect().width,
                            height: parent.getBoundingClientRect().height
                        }

                        itsSelectedElements.push(event.target === parent || (event.target.tagName === 'P' && (parentSize.width - shiftX <= 5 || parentSize.height - shiftY <= 5 || shiftX <= 5 || shiftY <= 5)))
                    } else {
                        itsSelectedElements.push(event.target === selectedElements[i] || (selectedElements[i] as HTMLElement).contains(event.target as Node))
                    }
                }
            }

            if (itsSelectedElements.includes(true)) {
                isMoveElements = true
            }
        }
    })

    return isMoveElements
}