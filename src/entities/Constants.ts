import {Color} from './Color'
import {Element} from "./Elements";
import {ElementType} from "./Elements";

export {
    WHITE,
    BLACK,
    GREEN,
    RED,
    DEFAULT_RECTANGLE
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
    id: 0,
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
    borderColor: BLACK,
    borderWidth: 1,
    backgroundColor: WHITE,
    type: ElementType.rectangle
}
