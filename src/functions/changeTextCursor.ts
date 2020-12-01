export function changeTextCursor(event: any) {
    let element = event.target as HTMLElement
    if (element.tagName === 'P' && element.classList.contains('element_choosed')) {
        let parent = element.parentNode as HTMLElement
        let shiftX = event.pageX - element.getBoundingClientRect().left;
        let shiftY = event.pageY - element.getBoundingClientRect().top;
        let cursorPos = {
            X: shiftX/parent.getBoundingClientRect().width * 100,
            Y: shiftY/parent.getBoundingClientRect().height * 100
        }

        if (cursorPos.X >= 95 || (cursorPos.Y >= 95 && cursorPos.Y <= 100) || cursorPos.X <= 5 || cursorPos.Y <= 5) {
            element.style.cursor = 'move'
        } else {
            element.style.cursor = 'text'
        }
    }
}