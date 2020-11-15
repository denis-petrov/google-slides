export function changeVisibilityTextStyleMenu(visibility: boolean) {
    let menuEditStyle = document.getElementById('edit_style_text')
    if (menuEditStyle) {
        menuEditStyle.style.visibility = visibility? 'visible' : 'hidden'
    }
}