import {changeStyleOfPrimitive} from '../functions/changeStyleOfPrimitive'
import {ElementType} from "../entities/Elements";
import {GREEN, RED} from "../entities/Constants";

describe('test change style of primitive', () => {
    test('change triangle`s, rectangle`s, ellipse`s background colors from white to red ' +
        'and border colors from black to green', () => {

        // Arrange
        let expectedEditor = {
            Presentation: {
                Name: 'test',
                Slides: [
                    {
                        Id: 1,
                        Elements: [
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
                                    Red: 0,
                                    Green: 255,
                                    Blue: 0
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
                                    Red: 255,
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
                                    Red: 0,
                                    Green: 255,
                                    Blue: 0
                                },
                                Type: ElementType.rectangle,
                                Width: 100,
                                Height: 100,
                                BackgroundColor: {
                                    Red: 255,
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
                                    Red: 0,
                                    Green: 255,
                                    Blue: 0
                                },
                                Type: ElementType.ellipse,
                                RadiusX: 50,
                                RadiusY: 50,
                                BackgroundColor: {
                                    Red: 255,
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
                        SelectionElementsId: [2, 3, 4]
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
                                Id: 2,
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: {
                                    Red: 0,
                                    Green: 0,
                                    Blue: 0
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
                                    Red: 255,
                                    Green: 255,
                                    Blue: 255
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
                                    Red: 0,
                                    Green: 0,
                                    Blue: 0
                                },
                                Type: ElementType.rectangle,
                                Width: 100,
                                Height: 100,
                                BackgroundColor: {
                                    Red: 255,
                                    Green: 255,
                                    Blue: 255
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
                                    Red: 0,
                                    Green: 0,
                                    Blue: 0
                                },
                                Type: ElementType.ellipse,
                                RadiusX: 50,
                                RadiusY: 50,
                                BackgroundColor: {
                                    Red: 255,
                                    Green: 255,
                                    Blue: 255
                                }
                            }
                        ],
                        Background: {
                            Red: 255,
                            Green: 255,
                            Blue: 255
                        },
                        SelectionElementsId: [2, 3, 4]
                    }
                ]
            },
            SelectionSlidesId: [1]
        }

        let result = changeStyleOfPrimitive(fullEditor, [ 2, 3, 4], RED, GREEN)

        // Assert
        expect(result).toStrictEqual(expectedEditor)
    })
})
