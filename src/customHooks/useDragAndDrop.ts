import {mouseMoveElements} from "../functions/mouseMoveElements"
import {changeVisibilitySlideHr} from "../slideMenu/changeVisibilitySlideHr"
import {moveElementPoint, resizeElements} from "../functions/resizeElements"
import {endMoveElements} from "../functions/endMoveElements"
import {clearAllSlideHr} from "../slideMenu/clearAllSlideHr"
import {removeSelectOfElement} from "../functions/removeSelectOfElements"
import {moveSlides} from "../functions/moveSlides"
import {moveElements} from "../slideArea/moveElements"
import {Dispatch} from "react"
import {useDispatch} from "react-redux"
import {store} from "../store/store"
import {CHANGE_POSITION_OF_ELEMENTS, END_MOVE_SLIDES} from "../store/actionTypes"
import {useEventListener} from "./useEventListner"
import {Editor} from "../entities/Editor"
import {endResizeElements} from "../functions/endResizeElements"


let isMoveElements: boolean
let firstPosX: number
let firstPosY: number
let isResize: boolean

let isMoveSlides: boolean

let pointIndex: number
let resizePayload: any
let resized = false

let isMouseMove = false

export function useDragAndDrop(editor: Editor) {
    const dispatch: Dispatch<any> = useDispatch()
    const allSlidesSvg = document.getElementsByClassName('slides-menu-item-svg')

    let handleMouseDown = (evt: MouseEvent) => {
        firstPosX = evt.clientX
        firstPosY = evt.clientY
        isMoveElements = moveElements(evt)

        isMoveSlides = moveSlides(evt)

        pointIndex = resizeElements(evt, pointIndex)
        isResize = pointIndex >= 0

        removeSelectOfElement(evt, store.dispatch)
    }
    useEventListener('mousedown', handleMouseDown)


    let handleMouseMove = (evt: MouseEvent) => {
        if (isMoveElements) {
            mouseMoveElements(evt, firstPosX, firstPosY)
        }

        if (isMoveSlides) {
            let selectedSlideId = editor.selectionSlidesId[0]
            let elem = evt.target as HTMLElement
            let elemId = elem.id

            let shiftY = evt.pageY - elem.getBoundingClientRect().top

            for (let i = 0; i < allSlidesSvg.length; i++) {
                if (allSlidesSvg[i].contains(elem)) {
                    elemId = allSlidesSvg[i].id
                }
            }
            if (elemId !== undefined && selectedSlideId !== elemId) {
                changeVisibilitySlideHr(editor, {shiftY: shiftY, startSlideId: selectedSlideId, endSlideId: elemId})
                isMouseMove = true
            }
        }

        if (isResize) {
            resized = true
            resizePayload = moveElementPoint(evt, firstPosX, firstPosY, pointIndex)
        }
    }
    useEventListener('mousemove', handleMouseMove)


    let handleMouseUp = (evt: MouseEvent) => {
        if (isMoveElements) {
            isMoveElements = endMoveElements(isMoveElements, store.dispatch)
        }

        if (isMoveSlides) {
            let selectedSlide = editor.selectionSlidesId[0]
            let elem = evt.target as HTMLElement
            let elemId = elem.id

            let shiftY = evt.pageY - elem.getBoundingClientRect().top

            for (let i = 0; i < allSlidesSvg.length; i++) {
                if (allSlidesSvg[i].contains(elem)) {
                    elemId = allSlidesSvg[i].id
                }
            }
            if (isMouseMove && elemId !== '' && elemId !== undefined && selectedSlide !== elemId) {
                dispatch({
                    type: END_MOVE_SLIDES,
                    payload: {shiftY: shiftY, startSlideId: selectedSlide, endSlideId: elemId}
                })
                isMouseMove = false
            }
            clearAllSlideHr()

            isMoveSlides = false
        }

        if (isResize) {
            isResize = false
            pointIndex = -1
            if (resized) {
                endResizeElements()
                if (!resizePayload.get('small')) {
                    dispatch({type: CHANGE_POSITION_OF_ELEMENTS, payload: resizePayload})
                }
            }
        }
    }
    useEventListener('mouseup', handleMouseUp)
}
