import {Editor} from '../src/entities/Editor'
import {Color} from '../src/entities/Color'
import {ElementType, Triangle} from '../src/entities/Elements'
import {Text} from '../src/entities/Elements'
import {Point} from '../src/entities/Point'
import {RED, WHITE} from '../src/entities/Constants'
import {deleteSlides} from '../src/functions/deleteSlides'

describe('deleteSlides', () => {
    test('Multiple removed slides, Needed slides are removed', () => {

        // Arrange
        let initialEditor: Editor = {
            presentation: {
                name: "Name",
                slides: [
                    {
                        id: 1,
                        elements: [
                            <Text>{
                                id: 1,
                                text: '123',
                                textStyle: {
                                    font: 'Robot',
                                    sizeFont: 18,
                                    color: RED,
                                    align: 'Center',
                                    isBold: false,
                                    isCurve: false
                                },
                                position: {
                                    x: 0,
                                    y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                borderColor: WHITE,
                                type: ElementType.text
                            }
                        ],
                        selectionElementsId: [],
                        background: <Color>{}
                    },
                    {
                        id: 2,
                        elements: [
                            <Triangle>{
                                id: 2,
                                a: <Point>{},
                                b: <Point>{},
                                c: <Point>{},
                                position: {
                                    x: 0,
                                    y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                borderColor: WHITE,
                                backgroundColor: WHITE,
                                type: ElementType.triangle
                            }
                        ],
                        selectionElementsId: [],
                        background: <Color>{}
                    },
                    {
                        id: 3,
                        elements: [
                            <Triangle>{
                                id: 2,
                                a: <Point>{},
                                b: <Point>{},
                                c: <Point>{},
                                position: {
                                    x: 0,
                                    y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                borderColor: WHITE,
                                backgroundColor: WHITE,
                                type: ElementType.triangle
                            }
                        ],
                        selectionElementsId: [],
                        background: <Color>{}
                    }
                ]
            },
            selectionSlidesId: []
        }
        let expectedEditor: Editor = {
            presentation: {
                name: "Name",
                slides: [
                    {
                        id: 2,
                        elements: [
                            <Triangle>{
                                id: 2,
                                a: <Point>{},
                                b: <Point>{},
                                c: <Point>{},
                                position: {
                                    x: 0,
                                    y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                borderColor: WHITE,
                                backgroundColor: WHITE,
                                type: ElementType.triangle
                            }
                        ],
                        selectionElementsId: [],
                        background: <Color>{}
                    }
                ]
            },
            selectionSlidesId: []
        }
        let slidesIdForDeleting: Array<number> = [1, 3]

        // Act
        let actualEditor = deleteSlides(initialEditor, slidesIdForDeleting)

        // Assert
        expect(actualEditor).toStrictEqual(expectedEditor)
    })

    test('No removed slides, No changes', () => {

        // Arrange
        let initialEditor: Editor = {
            presentation: {
                name: "Name",
                slides: [
                    {
                        id: 1,
                        elements: [
                            <Text>{
                                id: 1,
                                text: '123',
                                textStyle: {
                                    font: 'Robot',
                                    sizeFont: 18,
                                    color: RED,
                                    align: 'Center',
                                    isBold: false,
                                    isCurve: false
                                },
                                position: {
                                    x: 0,
                                    y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                borderColor: WHITE,
                                type: ElementType.text
                            }
                        ],
                        selectionElementsId: [],
                        background: <Color>{}
                    },
                    {
                        id: 2,
                        elements: [
                            <Triangle>{
                                id: 2,
                                a: <Point>{},
                                b: <Point>{},
                                c: <Point>{},
                                position: {
                                    x: 0,
                                    y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                borderColor: WHITE,
                                backgroundColor: WHITE,
                                type: ElementType.triangle
                            }
                        ],
                        selectionElementsId: [],
                        background: <Color>{}
                    }
                ]
            },
            selectionSlidesId: []
        }
        let expectedEditor: Editor = { ...initialEditor }
        let slidesIdForDeleting: Array<number> = []

        // Act
        let actualEditor = deleteSlides(initialEditor, slidesIdForDeleting)

        // Assert
        expect(actualEditor).toStrictEqual(expectedEditor)
    })
})