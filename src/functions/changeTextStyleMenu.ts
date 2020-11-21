function changeVisibility(elementId: string, visibility: boolean) {
    let element = document.getElementById(elementId)
    if (element) {
        element.style.visibility = visibility ? 'visible' : 'hidden'
    }
}

export function changeTextStyleMenu(visibility: boolean) {
    changeVisibility('edit_style_text_sep_0', visibility)
    changeVisibility('edit_style_text_font', visibility)
    changeVisibility('edit_style_text_sep_1', visibility)
    changeVisibility('edit_style_text_size', visibility)
    changeVisibility('edit_style_text_sep_2', visibility)
    changeVisibility('edit_style_text_color', visibility)
}