import {changePositionOfElements} from '../functions/changePositionOfElements'
import {ElementType} from '../entities/Elements'

describe('test change 4 elements positions', () => {
    test('increase the position on X and Y by 10, scaleX and scaleY by 1 and angleRoute by 15', () => {

        // Arrange
        let expectedEditor = {
            Presentation: {
                Name: 'test',
                Slides: [
                    {
                        Id: 1,
                        Elements: [
                            {
                                Id: 1,
                                Position: {
                                    X: 10,
                                    Y: 10
                                },
                                scaleX: 1,
                                scaleY: 1,
                                angleRoute: 15,
                                BorderColor: {
                                    Red: 255,
                                    Green: 255,
                                    Blue: 255
                                },
                                Type: ElementType.text,
                                Text: 'Test 1 by Andrey',
                                TextStyle: {
                                    Font: 'Times New Roman',
                                    SizeFont: 14,
                                    Color: {
                                        Red: 100,
                                        Green: 100,
                                        Blue: 100
                                    },
                                    Align: 'Left',
                                    isBold: true,
                                    isCurve: false
                                }
                            },
                            {
                                Id: 2,
                                Position: {
                                    X: 10,
                                    Y: 10
                                },
                                scaleX: 1,
                                scaleY: 1,
                                angleRoute: 15,
                                BorderColor: {
                                    Red: 255,
                                    Green: 255,
                                    Blue: 255
                                },
                                Type: ElementType.triangle,
                                A: {
                                    X: 20,
                                    Y: 50
                                },
                                B: {
                                    X: 100,
                                    Y: 50
                                },
                                C: {
                                    X: 150,
                                    Y: 10
                                },
                                BackgroundColor: {
                                    Red: 0,
                                    Green: 0,
                                    Blue: 0
                                },
                            },
                            {
                                Id: 3,
                                Position: {
                                    X: 10,
                                    Y: 10
                                },
                                scaleX: 1,
                                scaleY: 1,
                                angleRoute: 15,
                                BorderColor: {
                                    Red: 255,
                                    Green: 255,
                                    Blue: 255
                                },
                                Type: ElementType.rectangle,
                                Width: 100,
                                Height: 100,
                                BackgroundColor: {
                                    Red: 0,
                                    Green: 0,
                                    Blue: 0
                                }
                            },
                            {
                                Id: 4,
                                Position: {
                                    X: 10,
                                    Y: 10
                                },
                                scaleX: 1,
                                scaleY: 1,
                                angleRoute: 15,
                                BorderColor: {
                                    Red: 255,
                                    Green: 255,
                                    Blue: 255
                                },
                                Type: ElementType.ellipse,
                                RadiusX: 50,
                                RadiusY: 50,
                                BackgroundColor: {
                                    Red: 0,
                                    Green: 0,
                                    Blue: 0
                                }
                            }
                        ],
                        Background: {
                            Red: 255,
                            Green: 255,
                            Blue: 255
                        },
                        SelectionElementsId: [1, 2, 3, 4]
                    }
                ]
            },
            SelectionSlidesId: [1]
        }

        // Act
        let fullEditor = {
            Presentation: {
                Name: 'test',
                Slides: [
                    {
                        Id: 1,
                        Elements: [
                            {
                                Id: 1,
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: {
                                    Red: 255,
                                    Green: 255,
                                    Blue: 255
                                },
                                Type: ElementType.text,
                                Text: 'Test 1 by Andrey',
                                TextStyle: {
                                    Font: 'Times New Roman',
                                    SizeFont: 14,
                                    Color: {
                                        Red: 100,
                                        Green: 100,
                                        Blue: 100
                                    },
                                    Align: 'Left',
                                    isBold: true,
                                    isCurve: false
                                }
                            },
                            {
                                Id: 2,
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: {
                                    Red: 255,
                                    Green: 255,
                                    Blue: 255
                                },
                                Type: ElementType.triangle,
                                A: {
                                    X: 10,
                                    Y: 40
                                },
                                B: {
                                    X: 90,
                                    Y: 40
                                },
                                C: {
                                    X: 140,
                                    Y: 0
                                },
                                BackgroundColor: {
                                    Red: 0,
                                    Green: 0,
                                    Blue: 0
                                },
                            },
                            {
                                Id: 3,
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: {
                                    Red: 255,
                                    Green: 255,
                                    Blue: 255
                                },
                                Type: ElementType.rectangle,
                                Width: 100,
                                Height: 100,
                                BackgroundColor: {
                                    Red: 0,
                                    Green: 0,
                                    Blue: 0
                                }
                            },
                            {
                                Id: 4,
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: {
                                    Red: 255,
                                    Green: 255,
                                    Blue: 255
                                },
                                Type: ElementType.ellipse,
                                RadiusX: 50,
                                RadiusY: 50,
                                BackgroundColor: {
                                    Red: 0,
                                    Green: 0,
                                    Blue: 0
                                }
                            }
                        ],
                        Background: {
                            Red: 255,
                            Green: 255,
                            Blue: 255
                        },
                        SelectionElementsId: [1, 2, 3, 4]
                    }
                ]
            },
            SelectionSlidesId: [1]
        }

        let result = changePositionOfElements(fullEditor, [1, 2, 3, 4], {X: 10, Y: 10}, 1, 1, 15)

        // Assert
        expect(result).toStrictEqual(expectedEditor)
    })
})
