import {getEditor} from "../stateManager/StateManager";
import {Editor} from "../entities/Editor";
import {jsPDF} from "jspdf"
import {Element, ElementType, ImageElement, Text} from "../entities/Elements";
import {Slide} from "../entities/Slide";
import {PAGE_HEIGHT, PAGE_WIDTH, WHITE} from "../entities/Constants";
import {Color} from "../entities/Color";

export function drawElement(pdfDocument: jsPDF, element: Element) {
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
    } else if (element.type === ElementType.text) {
        let text = element as Text
        let textStyle = text.textStyle


        pdfDocument.text(
            text.text,
            text.topLeftPoint.x,
            text.topLeftPoint.y,
        )
    }
}

export function drawSlide(pdfDocument: jsPDF, slide: Slide) {
    for (let i = 0; i < slide.elements.length; i++) {
        let currElement = slide.elements[i]
        drawElement(pdfDocument, currElement)
    }
}

export function createPdf(): jsPDF {
    const pageSizeFormat = [PAGE_WIDTH, PAGE_HEIGHT]

    let editor: Editor = getEditor()
    let pdfDocument = new jsPDF('landscape', 'px', pageSizeFormat);

    for (let i = 0; i < editor.presentation.slides.length; ++i) {
        let currSlide = editor.presentation.slides[i]
        drawSlide(pdfDocument, currSlide)

        if (i < editor.presentation.slides.length - 1) {
            pdfDocument.addPage(pageSizeFormat)
        }
    }
    return pdfDocument
}
