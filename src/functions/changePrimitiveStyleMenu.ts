function changeVisibility(elementId: string, visibility: boolean) {
    let element = document.getElementById(elementId)
    if (element) {
        element.style.visibility = visibility ? 'visible' : 'hidden'
        element.style.display = visibility ? 'block' : ''
    }
}

export function changePrimitiveStyleMenu(visibility: boolean) {
    changeVisibility('edit_style_text_sep_0', visibility)
    changeVisibility('edit_style_text_delete', visibility)
    changeVisibility('edit_style_text_sep_1', visibility)
    changeVisibility('edit_style_element_fill_color', visibility)
    changeVisibility('edit_style_element_border_color', visibility)
    changeVisibility('edit_style_border_size', visibility)
}