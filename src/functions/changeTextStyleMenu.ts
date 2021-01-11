function changeVisibility(elementId: string, visibility: boolean) {
    let element = document.getElementById(elementId)
    if (!visibility) {
        let fonSize = document.getElementById('font-size-area') as HTMLElement
        if (fonSize) {
            fonSize.blur()
        }
    }

    if (element) {
        element.style.visibility = visibility ? 'visible' : 'hidden'
        element.style.display = visibility ? 'block' : ''
    }
}

export function changeTextStyleMenu(visibility: boolean) {
    changeVisibility('edit_style_text_sep_0', visibility)
    changeVisibility('edit_style_text_delete', visibility)
    changeVisibility('edit_style_text_sep_1', visibility)
    changeVisibility('edit_style_text_bold', visibility)
    changeVisibility('edit_style_text_italic', visibility)
    changeVisibility('edit_style_text_underline', visibility)
    changeVisibility('edit_style_text_sep_3', visibility)
    changeVisibility('edit_style_text_font', visibility)
    changeVisibility('edit_style_text_sep_4', visibility)
    changeVisibility('edit_style_text_size', visibility)
    changeVisibility('edit_style_text_color', visibility)
}