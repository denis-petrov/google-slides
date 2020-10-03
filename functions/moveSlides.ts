import {Editor} from '../entities/Editor'

export {
    moveSlides
}

function moveSlides(editor: Editor, listSlides: Array<number>, slideInsertId: number): Editor {
    let movedSlides = editor.Presentation.Slides.filter(slide => listSlides.includes(slide.Id));
    let slidesWithoutMovedSlides = editor.Presentation.Slides
        .filter(slide => !listSlides.includes(slide.Id));
    let slideMovePoint = slidesWithoutMovedSlides.findIndex(slide => slide.Id = slideInsertId);
    let slidesBeforeInsertSlide = slidesWithoutMovedSlides.slice(0, slideMovePoint)
    let slidesAfterInsertSlide = slidesWithoutMovedSlides.slice(slideMovePoint)
    return {
        ...editor,
        Presentation: {
            ...editor.Presentation,
            Slides: slidesBeforeInsertSlide.concat(movedSlides).concat(slidesAfterInsertSlide)
        }
    }
}   