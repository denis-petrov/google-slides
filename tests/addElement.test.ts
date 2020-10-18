import {BLACK, WHITE} from '../src/entities/Constants'
import {addElement} from '../src/functions/addElement'
import {ElementType, Ellipse, Rectangle, Text, Triangle} from '../src/entities/Elements'

describe('add elements to Slide', () => {
    test('add text to Slide', () => {
        // Arrange
        let expectedEditor = {
            presentation: {
                name: 'test',
                slides: [
                    {
                        id: 0,
                        elements: [
                            {
                                id: 0,
                                text: 'lmao',
                                textStyle: {
                                    font: 'Robot',
                                    sizeFont: 18,
                                    color: BLACK,
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
                            },
                            {
                                id: 1,
                                text: 'lmao',
                                textStyle: {
                                    font: 'Robot',
                                    sizeFont: 18,
                                    color: BLACK,
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
                        background: WHITE,
                        selectionElementsId: [0]
                    }
                ]
            },
            selectionSlidesId: [0]
        }

        // Act
        let emptyEditor = {
            presentation: {
                name: 'test',
                slides: [
                    {
                        id: 0,
                        elements: [
                            {
                                id: 0,
                                text: 'lmao',
                                textStyle: {
                                    font: 'Robot',
                                    sizeFont: 18,
                                    color: BLACK,
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
                        background: WHITE,
                        selectionElementsId: [0]
                    }
                ]
            },
            selectionSlidesId: [0]
        }
        let element: Text = {
            id: 1,
            text: 'lmao',
            textStyle: {
                font: 'Robot',
                sizeFont: 18,
                color: BLACK,
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
        let result = addElement(emptyEditor, element)

        // Assert
        expect(result).toEqual(expectedEditor)
    })

    test('add Triangle to Slide', () => {
        // Arrange
        let expectedEditor = {
            presentation: {
                name: 'test',
                slides: [
                    {
                        id: 0,
                        elements: [
                            {
                                id: 0,
                                text: 'lmao',
                                textStyle: {
                                    font: 'Robot',
                                    sizeFont: 18,
                                    color: BLACK,
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
                            },
                            {
                                id: 1,
                                a: {
                                    x: 0,
                                    y: 0
                                },
                                b: {
                                    x: 1,
                                    y: 1
                                },
                                c: {
                                    x: 2,
                                    y: 2
                                },
                                backgroundColor: WHITE,
                                position: {
                                    x: 0,
                                    y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                borderColor: WHITE,
                                type: ElementType.triangle
                            }
                        ],
                        background: WHITE,
                        selectionElementsId: [0]
                    }
                ]
            },
            selectionSlidesId: [0]
        }

        // Act
        let emptyEditor = {
            presentation: {
                name: 'test',
                slides: [
                    {
                        id: 0,
                        elements: [
                            {
                                id: 0,
                                text: 'lmao',
                                textStyle: {
                                    font: 'Robot',
                                    sizeFont: 18,
                                    color: BLACK,
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
                        background: WHITE,
                        selectionElementsId: [0]
                    }
                ]
            },
            selectionSlidesId: [0]
        }
        let element: Triangle = {
            id: 1,
            a: {
                x: 0,
                y: 0
            },
            b: {
                x: 1,
                y: 1
            },
            c: {
                x: 2,
                y: 2
            },
            backgroundColor: WHITE,
            position: {
                x: 0,
                y: 0
            },
            scaleX: 0,
            scaleY: 0,
            angleRoute: 0,
            borderColor: WHITE,
            type: ElementType.triangle
        }
        let result = addElement(emptyEditor, element)

        // Assert
        expect(result).toEqual(expectedEditor)
    })

    test('add Rectangle to Slide', () => {
        // Arrange
        let expectedEditor = {
            presentation: {
                name: 'test',
                slides: [
                    {
                        id: 0,
                        elements: [
                            {
                                id: 0,
                                text: 'lmao',
                                textStyle: {
                                    font: 'Robot',
                                    sizeFont: 18,
                                    color: BLACK,
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
                            },
                            {
                                id: 1,
                                width: 10,
                                height: 10,
                                backgroundColor: WHITE,
                                position: {
                                    x: 0,
                                    y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                borderColor: WHITE,
                                type: ElementType.rectangle
                            }
                        ],
                        background: WHITE,
                        selectionElementsId: [0]
                    }
                ]
            },
            selectionSlidesId: [0]
        }

        // Act
        let emptyEditor = {
            presentation: {
                name: 'test',
                slides: [
                    {
                        id: 0,
                        elements: [
                            {
                                id: 0,
                                text: 'lmao',
                                textStyle: {
                                    font: 'Robot',
                                    sizeFont: 18,
                                    color: BLACK,
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
                        background: WHITE,
                        selectionElementsId: [0]
                    }
                ]
            },
            selectionSlidesId: [0]
        }
        let element: Rectangle = {
            id: 1,
            width: 10,
            height: 10,
            backgroundColor: WHITE,
            position: {
                x: 0,
                y: 0
            },
            scaleX: 0,
            scaleY: 0,
            angleRoute: 0,
            borderColor: WHITE,
            type: ElementType.rectangle
        }
        let result = addElement(emptyEditor, element)

        // Assert
        expect(result).toEqual(expectedEditor)
    })

    test('add Ellipse to Slide', () => {
        // Arrange
        let expectedEditor = {
            presentation: {
                name: 'test',
                slides: [
                    {
                        id: 0,
                        elements: [
                            {
                                id: 0,
                                text: 'lmao',
                                textStyle: {
                                    font: 'Robot',
                                    sizeFont: 18,
                                    color: BLACK,
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
                            },
                            {
                                id: 1,
                                radiusX: 10,
                                radiusY: 10,
                                backgroundColor: WHITE,
                                position: {
                                    x: 0,
                                    y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                borderColor: WHITE,
                                type: ElementType.ellipse
                            }
                        ],
                        background: WHITE,
                        selectionElementsId: [0]
                    }
                ]
            },
            selectionSlidesId: [0]
        }

        // Act
        let emptyEditor = {
            presentation: {
                name: 'test',
                slides: [
                    {
                        id: 0,
                        elements: [
                            {
                                id: 0,
                                text: 'lmao',
                                textStyle: {
                                    font: 'Robot',
                                    sizeFont: 18,
                                    color: BLACK,
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
                        background: WHITE,
                        selectionElementsId: [0]
                    }
                ]
            },
            selectionSlidesId: [0]
        }
        let element: Ellipse = {
            id: 1,
            radiusX: 10,
            radiusY: 10,
            backgroundColor: WHITE,
            position: {
                x: 0,
                y: 0
            },
            scaleX: 0,
            scaleY: 0,
            angleRoute: 0,
            borderColor: WHITE,
            type: ElementType.ellipse
        }
        let result = addElement(emptyEditor, element)

        // Assert
        expect(result).toEqual(expectedEditor)
    })

    test('add third element to Slide', () => {
        // Arrange
        let expectedEditor = {
            presentation: {
                name: 'test',
                slides: [
                    {
                        id: 0,
                        elements: [
                            {
                                id: 0,
                                text: 'lmao',
                                textStyle: {
                                    font: 'Robot',
                                    sizeFont: 18,
                                    color: BLACK,
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
                            },
                            {
                                id: 1,
                                radiusX: 10,
                                radiusY: 10,
                                backgroundColor: WHITE,
                                position: {
                                    x: 0,
                                    y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                borderColor: WHITE,
                                type: ElementType.rectangle
                            },
                            {
                                id: 2,
                                width: 10,
                                height: 10,
                                backgroundColor: WHITE,
                                position: {
                                    x: 0,
                                    y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                borderColor: WHITE,
                                type: ElementType.rectangle
                            }
                        ],
                        background: WHITE,
                        selectionElementsId: [0]
                    }
                ]
            },
            selectionSlidesId: [0]
        }

        // Act
        let emptyEditor = {
            presentation: {
                name: 'test',
                slides: [
                    {
                        id: 0,
                        elements: [
                            {
                                id: 0,
                                text: 'lmao',
                                textStyle: {
                                    font: 'Robot',
                                    sizeFont: 18,
                                    color: BLACK,
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
                            },
                            {
                                id: 1,
                                radiusX: 10,
                                radiusY: 10,
                                backgroundColor: WHITE,
                                position: {
                                    x: 0,
                                    y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                borderColor: WHITE,
                                type: ElementType.rectangle
                            }
                        ],
                        background: WHITE,
                        selectionElementsId: [0]
                    }
                ]
            },
            selectionSlidesId: [0]
        }
        let element: Rectangle = {
            id: 1,
            width: 10,
            height: 10,
            backgroundColor: WHITE,
            position: {
                x: 0,
                y: 0
            },
            scaleX: 0,
            scaleY: 0,
            angleRoute: 0,
            borderColor: WHITE,
            type: ElementType.rectangle
        }
        let result = addElement(emptyEditor, element)

        // Assert
        expect(result).toEqual(expectedEditor)
    })
})

