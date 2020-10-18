import {changePositionOfElements} from '../src/functions/changePositionOfElements'
import {ElementType} from '../src/entities/Elements'

describe('test change 4 elements positions', () => {
    test('increase the position on X and Y by 10, scaleX and scaleY by 1 and angleRoute by 15', () => {

        // Arrange
        let expectedEditor = {
            presentation: {
                name: 'test',
                slides: [
                    {
                        id: 1,
                        elements: [
                            {
                                id: 1,
                                position: {
                                    x: 10,
                                    y: 10
                                },
                                scaleX: 1,
                                scaleY: 1,
                                angleRoute: 15,
                                borderColor: {
                                    red: 255,
                                    green: 255,
                                    blue: 255
                                },
                                type: ElementType.text,
                                text: 'Test 1 by Andrey',
                                textStyle: {
                                    font: 'Times New Roman',
                                    sizeFont: 14,
                                    color: {
                                        red: 100,
                                        green: 100,
                                        blue: 100
                                    },
                                    align: 'Left',
                                    isBold: true,
                                    isCurve: false
                                }
                            },
                            {
                                id: 2,
                                position: {
                                    x: 10,
                                    y: 10
                                },
                                scaleX: 1,
                                scaleY: 1,
                                angleRoute: 15,
                                borderColor: {
                                    red: 255,
                                    green: 255,
                                    blue: 255
                                },
                                type: ElementType.triangle,
                                a: {
                                    x: 20,
                                    y: 50
                                },
                                b: {
                                    x: 100,
                                    y: 50
                                },
                                c: {
                                    x: 150,
                                    y: 10
                                },
                                backgroundColor: {
                                    red: 0,
                                    green: 0,
                                    blue: 0
                                },
                            },
                            {
                                id: 3,
                                position: {
                                    x: 10,
                                    y: 10
                                },
                                scaleX: 1,
                                scaleY: 1,
                                angleRoute: 15,
                                borderColor: {
                                    red: 255,
                                    green: 255,
                                    blue: 255
                                },
                                type: ElementType.rectangle,
                                width: 100,
                                height: 100,
                                backgroundColor: {
                                    red: 0,
                                    green: 0,
                                    blue: 0
                                }
                            },
                            {
                                id: 4,
                                position: {
                                    x: 10,
                                    y: 10
                                },
                                scaleX: 1,
                                scaleY: 1,
                                angleRoute: 15,
                                borderColor: {
                                    red: 255,
                                    green: 255,
                                    blue: 255
                                },
                                type: ElementType.ellipse,
                                radiusX: 50,
                                radiusY: 50,
                                backgroundColor: {
                                    red: 0,
                                    green: 0,
                                    blue: 0
                                }
                            }
                        ],
                        background: {
                            red: 255,
                            green: 255,
                            blue: 255
                        },
                        selectionElementsId: [1, 2, 3, 4]
                    }
                ]
            },
            selectionSlidesId: [1]
        }

        // Act
        let fullEditor = {
            presentation: {
                name: 'test',
                slides: [
                    {
                        id: 1,
                        elements: [
                            {
                                id: 1,
                                position: {
                                    x: 0,
                                    y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                borderColor: {
                                    red: 255,
                                    green: 255,
                                    blue: 255
                                },
                                type: ElementType.text,
                                text: 'Test 1 by Andrey',
                                textStyle: {
                                    font: 'Times New Roman',
                                    sizeFont: 14,
                                    color: {
                                        red: 100,
                                        green: 100,
                                        blue: 100
                                    },
                                    align: 'Left',
                                    isBold: true,
                                    isCurve: false
                                }
                            },
                            {
                                id: 2,
                                position: {
                                    x: 0,
                                    y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                borderColor: {
                                    red: 255,
                                    green: 255,
                                    blue: 255
                                },
                                type: ElementType.triangle,
                                a: {
                                    x: 10,
                                    y: 40
                                },
                                b: {
                                    x: 90,
                                    y: 40
                                },
                                c: {
                                    x: 140,
                                    y: 0
                                },
                                backgroundColor: {
                                    red: 0,
                                    green: 0,
                                    blue: 0
                                },
                            },
                            {
                                id: 3,
                                position: {
                                    x: 0,
                                    y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                borderColor: {
                                    red: 255,
                                    green: 255,
                                    blue: 255
                                },
                                type: ElementType.rectangle,
                                width: 100,
                                height: 100,
                                backgroundColor: {
                                    red: 0,
                                    green: 0,
                                    blue: 0
                                }
                            },
                            {
                                id: 4,
                                position: {
                                    x: 0,
                                    y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                borderColor: {
                                    red: 255,
                                    green: 255,
                                    blue: 255
                                },
                                type: ElementType.ellipse,
                                radiusX: 50,
                                radiusY: 50,
                                backgroundColor: {
                                    red: 0,
                                    green: 0,
                                    blue: 0
                                }
                            }
                        ],
                        background: {
                            red: 255,
                            green: 255,
                            blue: 255
                        },
                        selectionElementsId: [1, 2, 3, 4]
                    }
                ]
            },
            selectionSlidesId: [1]
        }

        let result = changePositionOfElements(fullEditor, [1, 2, 3, 4], {x: 10, y: 10}, 1, 1, 15)

        // Assert
        expect(result).toStrictEqual(expectedEditor)
    })
})
