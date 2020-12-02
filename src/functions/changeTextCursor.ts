export function changeTextCursor(event: any) {
    let element = event.target as HTMLElement
    if (element.tagName === 'P' && element.classList.contains('element_choosed')) {
        let parent = element.parentNode as HTMLElement
        let shiftX = event.pageX - element.getBoundingClientRect().left
        let shiftY = event.pageY - element.getBoundingClientRect().top
        let parentSize = {
            width: parent.getBoundingClientRect().width,
            height: parent.getBoundingClientRect().height
        }

        if (parentSize.width - shiftX <= 5 || parentSize.height - shiftY <= 5 || shiftX <= 5 || shiftY <= 5) {
            element.style.cursor = 'move'
        } else {
            element.style.cursor = 'text'
        }
    }
}