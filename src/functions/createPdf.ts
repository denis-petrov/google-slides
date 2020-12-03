import {getEditor} from "../stateManager/StateManager"
import {Editor} from "../entities/Editor"
import {jsPDF} from "jspdf"
import {Element, ElementType, ImageElement, Text} from "../entities/Elements"
import {Slide} from "../entities/Slide"
import {PAGE_HEIGHT, PAGE_WIDTH, WHITE} from "../entities/Constants"
import {Color, isColor} from "../entities/Color"
import html2canvas from "html2canvas"

export async function drawElement(pdfDocument: jsPDF, element: Element) {
    let backgroundColor: Color = (element.backgroundColor === null) ? WHITE : (element.backgroundColor as Color)
    let borderColor: Color = element.borderColor
    let borderWidth: number = element.borderWidth

    pdfDocument.setFillColor(backgroundColor.red, backgroundColor.green, backgroundColor.blue)
    pdfDocument.setDrawColor(borderColor.red, borderColor.green, borderColor.blue)
    pdfDocument.setLineWidth(borderWidth)

    if (element.type === ElementType.triangle) {
        pdfDocument.triangle(
            element.bottomRightPoint.x / 100 * PAGE_WIDTH,
            element.bottomRightPoint.y / 100 * PAGE_HEIGHT,
            element.topLeftPoint.x / 100 * PAGE_WIDTH,
            element.bottomRightPoint.y / 100 * PAGE_HEIGHT,
            (element.bottomRightPoint.x + element.topLeftPoint.x) / 2 / 100 * PAGE_WIDTH,
            element.topLeftPoint.y / 100 * PAGE_HEIGHT,
            'DF')
    } else if (element.type === ElementType.text) {
        const canvasScalingFactor = 2

        let textDomElement = document.querySelector(`#slide-area p[id='${element.id}']`) as HTMLElement
        let canvas = await html2canvas(
            textDomElement,
            {
                scale: canvasScalingFactor,
                backgroundColor: null
            })
        let base64Image = canvas.toDataURL('img/png')

        let slideAreaWidth = (document.getElementById('slide-area') as HTMLElement).offsetWidth
        let slideAreaHeight = (document.getElementById('slide-area') as HTMLElement).offsetHeight
        let elementWidth = canvas.width / canvasScalingFactor
        let elementHeight = canvas.height / canvasScalingFactor
        let width = elementWidth * PAGE_WIDTH / slideAreaWidth
        let height = elementHeight * PAGE_HEIGHT / slideAreaHeight

        pdfDocument.addImage(
            base64Image,
            'png',
            element.topLeftPoint.x / 100 * PAGE_WIDTH,
            element.topLeftPoint.y / 100 * PAGE_HEIGHT,
            width,
            height
        )
    } else if (element.type === ElementType.ellipse) {
        pdfDocument.ellipse(
            (element.topLeftPoint.x + element.bottomRightPoint.x) / 2 / 100 * PAGE_WIDTH,
            (element.topLeftPoint.y + element.bottomRightPoint.y) / 2 / 100 * PAGE_HEIGHT,
            Math.abs(element.bottomRightPoint.x - element.topLeftPoint.x) / 2 / 100 * PAGE_WIDTH,
            Math.abs(element.bottomRightPoint.y - element.topLeftPoint.y) / 2 / 100 * PAGE_HEIGHT,
            'DF')
    } else if (element.type === ElementType.rectangle) {
        pdfDocument.rect(
            element.topLeftPoint.x / 100 * PAGE_WIDTH,
            element.topLeftPoint.y / 100 * PAGE_HEIGHT,
            Math.abs(element.bottomRightPoint.x - element.topLeftPoint.x) / 100 * PAGE_WIDTH,
            Math.abs(element.bottomRightPoint.y - element.topLeftPoint.y) / 100 * PAGE_HEIGHT,
            'DF')
    } else if (element.type === ElementType.image) {
        let img = element as ImageElement;
        let width = Math.abs(img.bottomRightPoint.x - img.topLeftPoint.x) / 100 * PAGE_WIDTH;
        let height = Math.abs(img.bottomRightPoint.y - img.topLeftPoint.y) / 100 * PAGE_HEIGHT;

        pdfDocument.addImage(
            img.link,
            'JPEG',
            img.topLeftPoint.x / 100 * PAGE_WIDTH,
            img.topLeftPoint.y / 100 * PAGE_HEIGHT,
            width,
            height,
        )
    }
}

export function drawBackground(pdfDocument: jsPDF, background: Color | string) {
    if (isColor(background)) {
        let color = background as Color;
        pdfDocument.setFillColor(color.red, color.green, color.blue)
        pdfDocument.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, 'DF')
    } else {
        let imageLink = background as string;
        pdfDocument.addImage(imageLink, 'JPEG', 0, 0, PAGE_WIDTH, PAGE_HEIGHT)
    }
}

export async function drawSlide(pdfDocument: jsPDF, slide: Slide) {
    drawBackground(pdfDocument, slide.background)
    for (let i = 0; i < slide.elements.length; i++) {
        let currElement = slide.elements[i]
        await drawElement(pdfDocument, currElement)
    }
}

export async function createPdf(): Promise<jsPDF> {
    const pageSizeFormat = [PAGE_WIDTH, PAGE_HEIGHT]

    let editor: Editor = getEditor()
    /* !заранее задать шрифты в jsPDF! */
    let pdfDocument = new jsPDF('landscape', 'px', pageSizeFormat)
    /* !заранее задать шрифты в jsPDF! */

    for (let i = 0; i < editor.presentation.slides.length; ++i) {
        let currSlide = editor.presentation.slides[i]
        await drawSlide(pdfDocument, currSlide)

        if (i < editor.presentation.slides.length - 1) {
            pdfDocument.addPage(pageSizeFormat)
        }
    }
    return pdfDocument
}
