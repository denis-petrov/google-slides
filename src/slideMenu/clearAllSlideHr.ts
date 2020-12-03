export function clearAllSlideHr() {
    let arraySlideHr = document.getElementsByClassName('slide_hr')
    for (let i = 0; i < arraySlideHr.length - 1; i++) {
        (arraySlideHr[i] as HTMLElement).style.visibility = 'hidden'
    }
}