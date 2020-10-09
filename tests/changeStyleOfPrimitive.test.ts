import {changeStyleOfPrimitive} from '../functions/changeStyleOfPrimitive'
import {ElementType} from '../entities/Elements'
import {GREEN, RED} from '../entities/Constants'

describe('test change style of primitive', () => {
    test('change triangle`s, rectangle`s, ellipse`s background colors from white to red ' +
        'and border colors from black to green', () => {

        // Arrange
        let expectedEditor = {
            presentation: {
                name: 'test',
                slides: [
                    {
                        id: 1,
                        elements: [
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
                                    red: 0,
                                    green: 255,
                                    blue: 0
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
                                    red: 255,
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
                                    red: 0,
                                    green: 255,
                                    blue: 0
                                },
                                type: ElementType.rectangle,
                                width: 100,
                                height: 100,
                                backgroundColor: {
                                    red: 255,
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
                                    red: 0,
                                    green: 255,
                                    blue: 0
                                },
                                type: ElementType.ellipse,
                                radiusX: 50,
                                radiusY: 50,
                                backgroundColor: {
                                    red: 255,
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
                        selectionElementsId: [2, 3, 4]
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
                                id: 2,
                                position: {
                                    x: 0,
                                    y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                borderColor: {
                                    red: 0,
                                    green: 0,
                                    blue: 0
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
                                    red: 255,
                                    green: 255,
                                    blue: 255
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
                                    red: 0,
                                    green: 0,
                                    blue: 0
                                },
                                type: ElementType.rectangle,
                                width: 100,
                                height: 100,
                                backgroundColor: {
                                    red: 255,
                                    green: 255,
                                    blue: 255
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
                                    red: 0,
                                    green: 0,
                                    blue: 0
                                },
                                type: ElementType.ellipse,
                                radiusX: 50,
                                radiusY: 50,
                                backgroundColor: {
                                    red: 255,
                                    green: 255,
                                    blue: 255
                                }
                            }
                        ],
                        background: {
                            red: 255,
                            green: 255,
                            blue: 255
                        },
                        selectionElementsId: [2, 3, 4]
                    }
                ]
            },
            selectionSlidesId: [1]
        }

        let result = changeStyleOfPrimitive(fullEditor, [ 2, 3, 4], RED, GREEN)

        // Assert
        expect(result).toStrictEqual(expectedEditor)
    })
})
