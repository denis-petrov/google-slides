export function changeTextStyleMenu(visibility: boolean) {
    function changeVisibility(elementId: string) {
        let element = document.getElementById(elementId)
        if (element) {
            element.style.visibility = visibility ? 'visible' : 'hidden'
        }
    }

    changeVisibility('edit_style_text_sep_0')
    changeVisibility('edit_style_text_font')
    changeVisibility('edit_style_text_sep_1')
    changeVisibility('edit_style_text_size')
    changeVisibility('edit_style_text_sep_2')
    changeVisibility('edit_style_text_color')
}