import {getEditor} from "../stateManager/StateManager";
import {ElementType, ImageElement} from "../entities/Elements";

export function endResizeElement(payload: any) {
    let editor = getEditor()
    editor.presentation.slides.map(s => {
        if (editor.selectionSlidesId.includes(s.id)) {
            s.elements.filter(e => {
                if (payload.get('elements').get(e.id)) {
                    let elementPathId = (document.getElementById(e.id) as HTMLElement).getAttribute('data-path-id')
                    let elementBorder = document.getElementById(elementPathId as string)
                    let width = Math.round((e.bottomRightPoint.x - e.topLeftPoint.x) * 100) / 100
                    let height = Math.round((e.bottomRightPoint.y - e.topLeftPoint.y) * 100) / 100
                    let viewBoxWidth = Math.round((e.bottomRightPoint.x - e.topLeftPoint.x) * 10 * 100) / 100
                    let viewBoxHeight
                    if (width > height) {
                        viewBoxHeight = Math.round(height * 10 * 100) / 100
                    } else {
                        viewBoxHeight = Math.round(height * 10 / 16 * 9 * 100) / 100
                    }

                    let d = `M 0, 0 H ${viewBoxWidth} V ${viewBoxHeight} H 0 V 0`
                    if (e.type === ElementType.image) {
                        let image = e as ImageElement
                        d = `M 0, 0 H ${image.viewBox.width} V ${image.viewBox.height} H 0 V 0`
                    }

                    if (elementBorder) {
                        elementBorder.setAttribute('d', d)
                    }
                }
            })
        }
    })
}