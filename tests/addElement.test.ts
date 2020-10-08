import {BLACK, WHITE} from '../entities/Constants'
import {addElement} from '../functions/addElement'
import {ElementType, Ellipse, Rectangle, Text, Triangle} from '../entities/Elements'

describe('add elements to Slide', () => {
    test('add text to Slide', () => {
        // Arrange
        let expectedEditor = {
            Presentation: {
                Name: 'test',
                Slides: [
                    {
                        Id: 0,
                        Elements: [
                            {
                                Id: 0,
                                Text: 'lmao',
                                TextStyle: {
                                    Font: 'Robot',
                                    SizeFont: 18,
                                    Color: BLACK,
                                    Align: 'Center',
                                    isBold: false,
                                    isCurve: false
                                },
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                Type: ElementType.text
                            },
                            {
                                Id: 1,
                                Text: 'lmao',
                                TextStyle: {
                                    Font: 'Robot',
                                    SizeFont: 18,
                                    Color: BLACK,
                                    Align: 'Center',
                                    isBold: false,
                                    isCurve: false
                                },
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                Type: ElementType.text

                            }
                        ],
                        Background: WHITE,
                        SelectionElementsId: [0]
                    }
                ]
            },
            SelectionSlidesId: [0]
        }

        // Act
        let emptyEditor = {
            Presentation: {
                Name: 'test',
                Slides: [
                    {
                        Id: 0,
                        Elements: [
                            {
                                Id: 0,
                                Text: 'lmao',
                                TextStyle: {
                                    Font: 'Robot',
                                    SizeFont: 18,
                                    Color: BLACK,
                                    Align: 'Center',
                                    isBold: false,
                                    isCurve: false
                                },
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                Type: ElementType.text

                            }
                        ],
                        Background: WHITE,
                        SelectionElementsId: [0]
                    }
                ]
            },
            SelectionSlidesId: [0]
        }
        let element: Text = {
            Id: 1,
            Text: 'lmao',
            TextStyle: {
                Font: 'Robot',
                SizeFont: 18,
                Color: BLACK,
                Align: 'Center',
                isBold: false,
                isCurve: false
            },
            Position: {
                X: 0,
                Y: 0
            },
            scaleX: 0,
            scaleY: 0,
            angleRoute: 0,
            BorderColor: WHITE,
            Type: ElementType.text
        }
        let result = addElement(emptyEditor, element)

        // Assert
        expect(result).toEqual(expectedEditor)
    })

    test('add Triangle to Slide', () => {
        // Arrange
        let expectedEditor = {
            Presentation: {
                Name: 'test',
                Slides: [
                    {
                        Id: 0,
                        Elements: [
                            {
                                Id: 0,
                                Text: 'lmao',
                                TextStyle: {
                                    Font: 'Robot',
                                    SizeFont: 18,
                                    Color: BLACK,
                                    Align: 'Center',
                                    isBold: false,
                                    isCurve: false
                                },
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                Type: ElementType.text
                            },
                            {
                                Id: 1,
                                A: {
                                    X: 0,
                                    Y: 0
                                },
                                B: {
                                    X: 1,
                                    Y: 1
                                },
                                C: {
                                    X: 2,
                                    Y: 2
                                },
                                BackgroundColor: WHITE,
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                Type: ElementType.triangle
                            }
                        ],
                        Background: WHITE,
                        SelectionElementsId: [0]
                    }
                ]
            },
            SelectionSlidesId: [0]
        }

        // Act
        let emptyEditor = {
            Presentation: {
                Name: 'test',
                Slides: [
                    {
                        Id: 0,
                        Elements: [
                            {
                                Id: 0,
                                Text: 'lmao',
                                TextStyle: {
                                    Font: 'Robot',
                                    SizeFont: 18,
                                    Color: BLACK,
                                    Align: 'Center',
                                    isBold: false,
                                    isCurve: false
                                },
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                Type: ElementType.text

                            }
                        ],
                        Background: WHITE,
                        SelectionElementsId: [0]
                    }
                ]
            },
            SelectionSlidesId: [0]
        }
        let element: Triangle = {
            Id: 1,
            A: {
                X: 0,
                Y: 0
            },
            B: {
                X: 1,
                Y: 1
            },
            C: {
                X: 2,
                Y: 2
            },
            BackgroundColor: WHITE,
            Position: {
                X: 0,
                Y: 0
            },
            scaleX: 0,
            scaleY: 0,
            angleRoute: 0,
            BorderColor: WHITE,
            Type: ElementType.triangle
        }
        let result = addElement(emptyEditor, element)

        // Assert
        expect(result).toEqual(expectedEditor)
    })

    test('add Rectangle to Slide', () => {
        // Arrange
        let expectedEditor = {
            Presentation: {
                Name: 'test',
                Slides: [
                    {
                        Id: 0,
                        Elements: [
                            {
                                Id: 0,
                                Text: 'lmao',
                                TextStyle: {
                                    Font: 'Robot',
                                    SizeFont: 18,
                                    Color: BLACK,
                                    Align: 'Center',
                                    isBold: false,
                                    isCurve: false
                                },
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                Type: ElementType.text
                            },
                            {
                                Id: 1,
                                Width: 10,
                                Height: 10,
                                Center: {
                                    X: 0,
                                    Y: 1
                                },
                                BackgroundColor: WHITE,
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                Type: ElementType.rectangle
                            }
                        ],
                        Background: WHITE,
                        SelectionElementsId: [0]
                    }
                ]
            },
            SelectionSlidesId: [0]
        }

        // Act
        let emptyEditor = {
            Presentation: {
                Name: 'test',
                Slides: [
                    {
                        Id: 0,
                        Elements: [
                            {
                                Id: 0,
                                Text: 'lmao',
                                TextStyle: {
                                    Font: 'Robot',
                                    SizeFont: 18,
                                    Color: BLACK,
                                    Align: 'Center',
                                    isBold: false,
                                    isCurve: false
                                },
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                Type: ElementType.text

                            }
                        ],
                        Background: WHITE,
                        SelectionElementsId: [0]
                    }
                ]
            },
            SelectionSlidesId: [0]
        }
        let element: Rectangle = {
            Id: 1,
            Width: 10,
            Height: 10,
            Center: {
                X: 0,
                Y: 1
            },
            BackgroundColor: WHITE,
            Position: {
                X: 0,
                Y: 0
            },
            scaleX: 0,
            scaleY: 0,
            angleRoute: 0,
            BorderColor: WHITE,
            Type: ElementType.rectangle
        }
        let result = addElement(emptyEditor, element)

        // Assert
        expect(result).toEqual(expectedEditor)
    })

    test('add Ellipse to Slide', () => {
        // Arrange
        let expectedEditor = {
            Presentation: {
                Name: 'test',
                Slides: [
                    {
                        Id: 0,
                        Elements: [
                            {
                                Id: 0,
                                Text: 'lmao',
                                TextStyle: {
                                    Font: 'Robot',
                                    SizeFont: 18,
                                    Color: BLACK,
                                    Align: 'Center',
                                    isBold: false,
                                    isCurve: false
                                },
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                Type: ElementType.text
                            },
                            {
                                Id: 1,
                                Center: {
                                    X: 0,
                                    Y: 0
                                },
                                RadiusX: 10,
                                RadiusY: 10,
                                BackgroundColor: WHITE,
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                Type: ElementType.ellipse
                            }
                        ],
                        Background: WHITE,
                        SelectionElementsId: [0]
                    }
                ]
            },
            SelectionSlidesId: [0]
        }

        // Act
        let emptyEditor = {
            Presentation: {
                Name: 'test',
                Slides: [
                    {
                        Id: 0,
                        Elements: [
                            {
                                Id: 0,
                                Text: 'lmao',
                                TextStyle: {
                                    Font: 'Robot',
                                    SizeFont: 18,
                                    Color: BLACK,
                                    Align: 'Center',
                                    isBold: false,
                                    isCurve: false
                                },
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                Type: ElementType.text

                            }
                        ],
                        Background: WHITE,
                        SelectionElementsId: [0]
                    }
                ]
            },
            SelectionSlidesId: [0]
        }
        let element: Ellipse = {
            Id: 1,
            Center: {
                X: 0,
                Y: 0
            },
            RadiusX: 10,
            RadiusY: 10,
            BackgroundColor: WHITE,
            Position: {
                X: 0,
                Y: 0
            },
            scaleX: 0,
            scaleY: 0,
            angleRoute: 0,
            BorderColor: WHITE,
            Type: ElementType.ellipse
        }
        let result = addElement(emptyEditor, element)

        // Assert
        expect(result).toEqual(expectedEditor)
    })

    test('add third element to Slide', () => {
        // Arrange
        let expectedEditor = {
            Presentation: {
                Name: 'test',
                Slides: [
                    {
                        Id: 0,
                        Elements: [
                            {
                                Id: 0,
                                Text: 'lmao',
                                TextStyle: {
                                    Font: 'Robot',
                                    SizeFont: 18,
                                    Color: BLACK,
                                    Align: 'Center',
                                    isBold: false,
                                    isCurve: false
                                },
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                Type: ElementType.text
                            },
                            {
                                Id: 1,
                                Center: {
                                    X: 0,
                                    Y: 0
                                },
                                RadiusX: 10,
                                RadiusY: 10,
                                BackgroundColor: WHITE,
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                Type: ElementType.rectangle
                            },
                            {
                                Id: 2,
                                Width: 10,
                                Height: 10,
                                Center: {
                                    X: 0,
                                    Y: 1
                                },
                                BackgroundColor: WHITE,
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                Type: ElementType.rectangle
                            }
                        ],
                        Background: WHITE,
                        SelectionElementsId: [0]
                    }
                ]
            },
            SelectionSlidesId: [0]
        }

        // Act
        let emptyEditor = {
            Presentation: {
                Name: 'test',
                Slides: [
                    {
                        Id: 0,
                        Elements: [
                            {
                                Id: 0,
                                Text: 'lmao',
                                TextStyle: {
                                    Font: 'Robot',
                                    SizeFont: 18,
                                    Color: BLACK,
                                    Align: 'Center',
                                    isBold: false,
                                    isCurve: false
                                },
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                Type: ElementType.text
                            },
                            {
                                Id: 1,
                                Center: {
                                    X: 0,
                                    Y: 0
                                },
                                RadiusX: 10,
                                RadiusY: 10,
                                BackgroundColor: WHITE,
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                Type: ElementType.rectangle
                            }
                        ],
                        Background: WHITE,
                        SelectionElementsId: [0]
                    }
                ]
            },
            SelectionSlidesId: [0]
        }
        let element: Rectangle = {
            Id: 1,
            Width: 10,
            Height: 10,
            Center: {
                X: 0,
                Y: 1
            },
            BackgroundColor: WHITE,
            Position: {
                X: 0,
                Y: 0
            },
            scaleX: 0,
            scaleY: 0,
            angleRoute: 0,
            BorderColor: WHITE,
            Type: ElementType.rectangle
        }
        let result = addElement(emptyEditor, element)

        // Assert
        expect(result).toEqual(expectedEditor)
    })
})

