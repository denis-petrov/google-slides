import {Color} from './Color'
import {Element} from "./Elements"
import {ElementType} from "./Elements"

export {
    WHITE,
    BLACK,
    GREEN,
    RED,
    DEFAULT_RECTANGLE,
    DEFAULT_TRIANGLE,
    DEFAULT_ELLIPSE
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
        y: 17.78
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
        y: 17.78
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
        y: 17.78
    },
    borderColor: BLACK,
    borderWidth: 1,
    backgroundColor: WHITE,
    type: ElementType.ellipse
}
