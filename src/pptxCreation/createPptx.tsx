import React from "react";
import {
    Presentation, Slide, Text,
    Shape, Image, render
} from "react-pptx"
import {Editor} from "../entities/Editor";
import * as ElementsModule from "../entities/Elements"
import * as SlidesModule from "../entities/Slide"
import {Color, isColor} from "../entities/Color"
import {ElementType} from "../entities/Elements"

function createRgbLine(color: Color) {
    let redHex = color.red.toString(16)
    if (redHex.length == 1) {
        redHex = "0" + redHex
    }

    let greenHex = color.green.toString(16)
    if (greenHex.length == 1) {
        greenHex = "0" + greenHex
    }

    let blueHex = color.blue.toString(16)
    if (blueHex.length == 1) {
        blueHex = "0" + blueHex
    }

    return `#${redHex}${greenHex}${blueHex}`
}

function convertAlign(align: string | undefined): "left" | "right" | "center" | undefined {
    if (align === "left") {
        return "left"
    } else if (align === "right") {
        return "right"
    } else if (align === "center") {
        return "center"
    } else {
        return undefined
    }
}

export function drawElement(element: ElementsModule.Element): JSX.Element {
    let boundingBoxCoordinates = {
        x: `${Math.round(element.topLeftPoint.x)}%`,
        y: `${Math.round(element.topLeftPoint.y)}%`,
        w: `${Math.round(Math.abs(element.topLeftPoint.x - element.bottomRightPoint.x))}%`,
        h: `${Math.round(Math.abs(element.topLeftPoint.y - element.bottomRightPoint.y))}%`
    }
    let shapeSettings = {
        ...boundingBoxCoordinates,
        backgroundColor: element.backgroundColor === null ? "#FFFFFF" : createRgbLine(element.backgroundColor),
        borderWidth: element.borderWidth,
        borderColor: createRgbLine(element.borderColor)
    }
    if (element.type === ElementType.triangle) {
        return <Shape
            type="triangle"
            style={shapeSettings}/>
    } else if (element.type === ElementType.text) {
        let text = element as ElementsModule.Text
        return <Text style={{
            x: `${Math.round(element.topLeftPoint.x * 0.99)}%`,
            y: `${Math.round(element.topLeftPoint.y * 0.99)}%`,
            w: `${Math.ceil(Math.abs(element.topLeftPoint.x - element.bottomRightPoint.x) * 1.25)}%`,
            h: `${Math.ceil(Math.abs(element.topLeftPoint.y - element.bottomRightPoint.y))}%`,
            color: createRgbLine(text.textStyle.color),
            fontFace: text.textStyle.font,
            fontSize: 0.75 * text.textStyle.sizeFont,
            align: convertAlign(text.textStyle.align),
            verticalAlign: "top"
        }}>
            <b>{text.text}</b>
        </Text>
    } else if (element.type === ElementType.ellipse) {
        return <Shape
            type="ellipse"
            style={shapeSettings}/>
    } else if (element.type === ElementType.rectangle) {
        return <Shape
            type="rect"
            style={shapeSettings}/>
    } else if (element.type === ElementType.image) {
        return <Image src={{kind:"data", data:(element as ElementsModule.ImageElement).link}} style={boundingBoxCoordinates}/>
    } else {
        throw Error(`Incorrect slide element type`)
    }
}

export function drawSlide(slide: SlidesModule.Slide): JSX.Element {
    let backgroundColor: string | undefined =
        isColor(slide.background) ? createRgbLine(slide.background as Color): undefined
    let backgroundImage: { kind: "data"; data: string; } | { kind: "path"; path: string; } | undefined =
        !isColor(slide.background) ? {kind: "data", "data": slide.background as string} : undefined
    return <Slide style={{
        backgroundColor: backgroundColor,
        backgroundImage: backgroundImage
    }}>
        {slide.elements.map(currElement => drawElement(currElement))}
    </Slide>
}

export async function createPptx(editor: Editor) {
    return render(<Presentation layout={"16x9"}>
        {editor.presentation.slides.map(currSlide => drawSlide(currSlide))}
    </Presentation>)
}
