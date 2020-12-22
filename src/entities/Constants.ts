import {Color} from './Color'
import {Element, ElementType, ImageElement, Text} from "./Elements"

export {
    WHITE,
    BLACK,
    GREEN,
    RED,
    DEFAULT_RECTANGLE,
    DEFAULT_TRIANGLE,
    DEFAULT_ELLIPSE,
    DEFAULT_TEXT,
    DEFAULT_IMAGE,
    PAGE_HEIGHT,
    PAGE_WIDTH,
    LOCAL_STORAGE_EDITOR_KEY,
    LOCAL_STORAGE_STATE_HISTORY_KEY
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
        y: 0
    },
    bottomRightPoint: {
        x: 10,
        y: 17.77
    },
    borderColor: {
        red: 0,
        green: 0,
        blue: 0
    },
    borderWidth: 0,
    backgroundColor: BLACK,
    text: '',
    textStyle: {
        font: 'Arial',
        sizeFont: 40,
        color: {
            red: 0,
            green: 0,
            blue: 0
        },
        align: 'Left',
        isBold: false,
        isCurve: false,
        isUnderline: false,
    },
    type: ElementType.text
}

const DEFAULT_IMAGE: ImageElement = {
    id: '',
    link: '',
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
    viewBox: {
        width: 0,
        height: 0,
    },
    type: ElementType.image
}

const PAGE_WIDTH = 1920
const PAGE_HEIGHT = 1080
const LOCAL_STORAGE_EDITOR_KEY = "Editor"
const LOCAL_STORAGE_STATE_HISTORY_KEY = "StateHistory"