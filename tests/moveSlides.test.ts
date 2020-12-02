import {Editor} from '../src/entities/Editor'
import {Color} from '../src/entities/Color'
import {ElementType, Triangle} from '../src/entities/Elements'
import {Text} from '../src/entities/Elements'
import {Point} from '../src/entities/Point'
import {RED, WHITE} from '../src/entities/Constants'
import {endMoveSlides} from '../src/functions/endMoveSlides'

describe('moveSlides', () => {
    test('Move before element in the middle, Successfully moved elements', () => {

        // Arrange
        let initialEditor: Editor = {
            presentation: {
                name: "name",
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
                    },
                    {
                        id: 4,
                        elements: [
                            <Triangle>{
                                id: 2,
                                a: <Point>{},
                                b: <Point>{},
                                c: <Point>{},
                                position: {
                                    x: 10,
                                    y: 20
                                },
                                scaleX: 20,
                                scaleY: 30,
                                angleRoute: 20,
                                borderColor: WHITE,
                                backgroundColor: WHITE,
                                type: ElementType.triangle
                            }
                        ],
                        selectionElementsId: [],
                        background: <Color>{}
                    },
                ]
            },
            selectionSlidesId: []
        }
        let expectedEditor: Editor = {
            presentation: {
                name: "name",
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
                    },
                    {
                        id: 4,
                        elements: [
                            <Triangle>{
                                id: 2,
                                a: <Point>{},
                                b: <Point>{},
                                c: <Point>{},
                                position: {
                                    x: 10,
                                    y: 20
                                },
                                scaleX: 20,
                                scaleY: 30,
                                angleRoute: 20,
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
        let listSlides = [2, 3]
        let slideInsertId = 1

        // Act
        let actualEditor = endMoveSlides(initialEditor, listSlides, slideInsertId);

        // Assert
        expect(actualEditor).toStrictEqual(expectedEditor)
    })

    test('Move before last element, Successfully moved elements', () => {

        // Arrange
        let initialEditor: Editor = {
            presentation: {
                name: "name",
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
                    },
                    {
                        id: 4,
                        elements: [
                            <Triangle>{
                                id: 2,
                                a: <Point>{},
                                b: <Point>{},
                                c: <Point>{},
                                position: {
                                    x: 10,
                                    y: 20
                                },
                                scaleX: 20,
                                scaleY: 30,
                                angleRoute: 20,
                                borderColor: WHITE,
                                backgroundColor: WHITE,
                                type: ElementType.triangle
                            }
                        ],
                        selectionElementsId: [],
                        background: <Color>{}
                    },
                ]
            },
            selectionSlidesId: []
        }
        let expectedEditor: Editor = {
            presentation: {
                name: 'name',
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
                        id: 4,
                        elements: [
                            <Triangle>{
                                id: 2,
                                a: <Point>{},
                                b: <Point>{},
                                c: <Point>{},
                                position: {
                                    x: 10,
                                    y: 20
                                },
                                scaleX: 20,
                                scaleY: 30,
                                angleRoute: 20,
                                borderColor: WHITE,
                                backgroundColor: WHITE,
                                type: ElementType.triangle
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
        let listSlides = [2, 3]
        let slideInsertId = 4

        // Act
        let actualEditor = endMoveSlides(initialEditor, listSlides, slideInsertId);

        // Assert
        expect(actualEditor).toStrictEqual(expectedEditor)
    })

    test('"slideInsertId" in "listSlides", Error', () => {

        // Arrange
        let initialEditor: Editor = {
            presentation: {
                name: "name",
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
                    },
                    {
                        id: 4,
                        elements: [
                            <Triangle>{
                                id: 2,
                                a: <Point>{},
                                b: <Point>{},
                                c: <Point>{},
                                position: {
                                    x: 10,
                                    y: 20
                                },
                                scaleX: 20,
                                scaleY: 30,
                                angleRoute: 20,
                                borderColor: WHITE,
                                backgroundColor: WHITE,
                                type: ElementType.triangle
                            }
                        ],
                        selectionElementsId: [],
                        background: <Color>{}
                    },
                ]
            },
            selectionSlidesId: []
        }
        let listSlides = [2, 3]
        let slideInsertId = 2

        // Act
        let callingFunction = () => endMoveSlides(initialEditor, listSlides, slideInsertId);

        // Assert
        expect(callingFunction).toThrow('"slideInsertId" cannot be in "listSlides"')
    })
})