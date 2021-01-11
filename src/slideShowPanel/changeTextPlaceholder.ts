export function changeTextPlaceholder(placeholder: string) {
    let texts = document.getElementsByTagName('p')
    for (let i = 0; i < texts.length; i++) {
        if (texts[i].getAttribute('data-is-element')) {
            texts[i].setAttribute('data-placeholder', placeholder)
        }
    }
}