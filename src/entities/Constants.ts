import {Color} from './Color'
import {Element, ElementType, ImageElement, Text} from "./Elements"
import {deepCopy} from "deep-copy-ts"

export {
    WHITE,
    BLACK,
    GREEN,
    RED,
    DEFAULT_RECTANGLE,
    DEFAULT_TRIANGLE,
    DEFAULT_ELLIPSE,
    DEFAULT_TEXT,
    DEFAULT_IMAGE
}

const WHITE: Color = {
    red: 255,
    green: 255,
    blue: 255
}

const BLACK: Color = {
    red: 0,
    green: 0,
    blue: 0
}

const GREEN: Color = {
    red: 0,
    green: 255,
    blue: 0
}

const RED: Color = {
    red: 255,
    green: 0,
    blue: 0
}

const DEFAULT_RECTANGLE: Element = {
    id: '',
    center: {
        x: 50,
        y: 50
    },
    topLeftPoint: {
        x: 0,
        y: 0
    },
    bottomRightPoint: {
        x: 10,
        y: 17.77
    },
    borderColor: BLACK,
    borderWidth: 1,
    backgroundColor: WHITE,
    type: ElementType.rectangle
}

const DEFAULT_TRIANGLE: Element = {
    id: '',
    center: {
        x: 50,
        y: 50
    },
    topLeftPoint: {
        x: 0,
        y: 0
    },
    bottomRightPoint: {
        x: 10,
        y: 17.77
    },
    borderColor: BLACK,
    borderWidth: 1,
    backgroundColor: WHITE,
    type: ElementType.triangle
}

const DEFAULT_ELLIPSE: Element = {
    id: '',
    center: {
        x: 5,
        y: 8.89
    },
    topLeftPoint: {
        x: 0,
        y: 0
    },
    bottomRightPoint: {
        x: 10,
        y: 17.77
    },
    borderColor: BLACK,
    borderWidth: 1,
    backgroundColor: WHITE,
    type: ElementType.ellipse
}

const DEFAULT_TEXT: Text = {
    id: '',
    center: {
        x: 5,
        y: 8.89
    },
    topLeftPoint: {
        x: 0,
        y: 5
    },
    bottomRightPoint: {
        x: 10,
        y: 17.77
    },
    borderColor: {
        red: 255,
        green: 255,
        blue: 255
    },
    borderWidth: 1,
    backgroundColor: BLACK,
    text: '',
    textStyle: {
        font: 'Arial',
        sizeFont: 16,
        color: {
            red: 0,
            green: 255,
            blue: 0
        },
        align: 'Left',
        isBold: true,
        isCurve: true
    },
    type: ElementType.text
}

const DEFAULT_IMAGE: ImageElement = {
    id: '',
    base64: '',
    center: {
        x: 0,
        y: 0
    },
    topLeftPoint: {
        x: 0,
        y: 0
    },
    bottomRightPoint: {
        x: 0,
        y: 0
    },
    borderColor: WHITE,
    borderWidth: 0,
    backgroundColor: WHITE,
    type: ElementType.image
}

function changeImageData(image: ImageElement, img: HTMLImageElement) {
    image.bottomRightPoint.x = img.width
    image.bottomRightPoint.y = img.height
    return image
}

export function getImage(constImage: ImageElement, base64: string) {
    let copyImage = deepCopy(constImage)
    let img = new Image()
    img.setAttribute('src', base64)
    img.onload = async () => await changeImageData(copyImage, img)
    copyImage.base64 = base64
    console.log(img.width)

    return copyImage
}