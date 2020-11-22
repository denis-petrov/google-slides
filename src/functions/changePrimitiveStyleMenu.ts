function changeVisibility(elementId: string, visibility: boolean) {
    let element = document.getElementById(elementId)
    if (element) {
        element.style.visibility = visibility ? 'visible' : 'hidden'
    }
}

export function changePrimitiveStyleMenu(visibility: boolean) {
    changeVisibility('edit_style_text_sep_0', visibility)
    changeVisibility('edit_style_text_delete', visibility)
    changeVisibility('edit_style_text_sep_1', visibility)
    changeVisibility('edit_style_element_color', visibility)
}