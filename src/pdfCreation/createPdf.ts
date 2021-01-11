import {Editor} from "../entities/Editor"
import {jsPDF} from "jspdf"
import {Element, ElementType, ImageElement} from "../entities/Elements"
import {Slide} from "../entities/Slide"
import {PAGE_HEIGHT, PAGE_WIDTH, WHITE} from "../entities/Constants"
import {Color, isColor} from "../entities/Color"
import html2canvas from "html2canvas"
import {store} from "../store/store"
import {changeTextPlaceholder} from "../slideShowPanel/changeTextPlaceholder"

const gifFrames = require('gif-frames');

export async function drawElement(pdfDocument: jsPDF, element: Element, slide: Slide) {
    let backgroundColor: Color = (element.backgroundColor === null) ? WHITE : (element.backgroundColor as Color)
    let borderColor: Color = element.borderColor
    let borderWidth: number = element.borderWidth

    pdfDocument.setFillColor(backgroundColor.red, backgroundColor.green, backgroundColor.blue)
    if (borderWidth !== 0) {
        pdfDocument.setDrawColor(borderColor.red, borderColor.green, borderColor.blue)
        pdfDocument.setLineWidth(borderWidth)
    } else {
        pdfDocument.setDrawColor(backgroundColor.red, backgroundColor.green, backgroundColor.blue)
    }

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
        let textDomElement = document.getElementById(element.id) as HTMLElement
        let canvas = await html2canvas(
            textDomElement,
            {
                scale: canvasScalingFactor,
                backgroundColor: null
            })
        let base64Image = canvas.toDataURL('img/png')

        let slideAreaWidth = (document.getElementById(`slide_area_${slide.id}`) as HTMLElement).clientWidth
        let slideAreaHeight = (document.getElementById(`slide_area_${slide.id}`) as HTMLElement).clientHeight
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
        let link = img.link;
        let reg = new RegExp("image/gif");
        let gifMatches = img.link.match(reg);
        let isGif = img.link.match(/.gif\b/) || (gifMatches && gifMatches.length > 0);
        if (isGif) {
            await gifFrames({ url: img.link, frames: 0, outputType: 'canvas' })
                .then(function (frameData: Array<any>) {
                    let canvas = frameData[0].getImage();
                    link = canvas.toDataURL('img/png');
                })
        }

        let width = Math.abs(img.bottomRightPoint.x - img.topLeftPoint.x) / 100 * PAGE_WIDTH;
        let height = Math.abs(img.bottomRightPoint.y - img.topLeftPoint.y) / 100 * PAGE_HEIGHT;

        pdfDocument.addImage(
            link,
            'png',
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
        let img = new Image();
        img.src = imageLink;
        let originalWidth = img.width;
        let originalHeight = img.height;
        let height = PAGE_HEIGHT;
        if (originalHeight / 9 * 16 > originalWidth) {
            height = originalHeight / 9 * 16 / originalWidth * PAGE_HEIGHT;
        }

        pdfDocument.addImage(imageLink, 'JPEG', 0, 0, PAGE_WIDTH, height)
    }
}

export async function drawSlide(pdfDocument: jsPDF, slide: Slide) {
    drawBackground(pdfDocument, slide.background)
    for (let i = 0; i < slide.elements.length; i++) {
        let currElement = slide.elements[i]
        await drawElement(pdfDocument, currElement, slide)
    }
}

export async function createPdf(): Promise<jsPDF> {
    showLoadingCircle(true)
    const pageSizeFormat = [PAGE_WIDTH, PAGE_HEIGHT]
    changeTextPlaceholder('')

    let editor: Editor = store.getState()
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
    changeTextPlaceholder('Insert text here')
    showLoadingCircle(false)

    return pdfDocument
}

export function showLoadingCircle(show: boolean) {
    let slideMask = document.getElementById('slide-mask') as HTMLElement
    if (show) {
        slideMask.style.visibility = 'visible'
        slideMask.style.backgroundColor = 'rgba(0, 0, 0, .5)'
        slideMask.style.zIndex = '99999'
    } else {
        slideMask.style.visibility = ''
        slideMask.style.backgroundColor = ''
        slideMask.style.zIndex = ''
    }

    let presentationPanel = document.getElementsByClassName('presentation_panel')[0] as HTMLElement
    if (show) {
        presentationPanel.style.visibility = 'hidden'
    } else {
        presentationPanel.style.visibility = ''
    }

    let loadingCircle = document.getElementById('loading-circle') as HTMLElement
    if (show) {
        loadingCircle.style.visibility = 'visible'
    } else {
        loadingCircle.style.visibility = ''
    }
}
