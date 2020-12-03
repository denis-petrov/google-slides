import {getEditor} from "../stateManager/StateManager"

export function mouseMoveElements(evt: any, firstPosX: number, firstPosY: number) {
    let editor = getEditor()
    let stepX
    let stepY
    editor.presentation.slides.map(s => {
        if (editor.selectionSlidesId.includes(s.id)) {
            let selectedElements = []
            for (let i = 0; i < s.selectionElementsId.length; i++) {
                selectedElements.push(document.getElementById(s.selectionElementsId[i]))
            }

            stepX = evt.clientX - firstPosX
            stepY = evt.clientY - firstPosY

            let slide = document.getElementsByClassName('workspace')[0]
            for (let i = 0; i < selectedElements.length; i++) {
                let elem = selectedElements[i]
                if (elem) {
                    let parent = elem.parentNode as HTMLElement
                    if (elem.tagName === 'P') {
                        parent = parent.parentNode as HTMLElement
                    }

                    let prevXAttribute
                    let prevYAttribute

                    s.elements.map(e => {
                        if (elem && e.id === elem.id) {
                            prevXAttribute = e.topLeftPoint.x
                            prevYAttribute = e.topLeftPoint.y
                        }
                    })

                    let X = '0%'
                    let Y = '0%'
                    if (prevXAttribute !== undefined) {
                        X = Math.floor(stepX / (slide.clientWidth) * 100 * 100) / 100 + '%'
                    }

                    if (prevYAttribute !== undefined) {
                        Y = Math.floor(stepY / (slide.clientHeight) * 100 * 100) / 100 + '%'
                    }

                    if (parent) {
                        parent.setAttribute('x', X)
                        parent.setAttribute('y', Y)
                    }
                }
            }
        }
    })
}