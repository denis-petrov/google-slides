import {Editor} from '../entities/Editor'

export {
    moveSlides
}

function moveSlides(editor: Editor, listSlides: Array<number>, slideInsertId: number): Editor {
    if (listSlides.includes(slideInsertId)) {
        throw new Error('"slideInsertId" cannot be in "listSlides"')
    }
    let movedSlides = editor.presentation.slides.filter(slide => listSlides.includes(slide.id));
    let slidesWithoutMovedSlides = editor.presentation.slides
        .filter(slide => !listSlides.includes(slide.id));
    let slideMovePoint = slidesWithoutMovedSlides.findIndex(slide => slide.id == slideInsertId) + 1;
    let slidesBeforeInsertSlide = slidesWithoutMovedSlides.slice(0, slideMovePoint)
    let slidesAfterInsertSlide = slidesWithoutMovedSlides.slice(slideMovePoint)
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: slidesBeforeInsertSlide.concat(movedSlides).concat(slidesAfterInsertSlide)
        }
    }
}   