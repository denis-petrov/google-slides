import {Editor} from "../entities/Editor"
import {Color} from "../entities/Color"
import {ElementType, Triangle} from "../entities/Elements"
import {Text} from "../entities/Elements"
import {Point} from "../entities/Point"
import {BLACK, WHITE} from "../entities/Constants"
import {deleteSlides} from "../functions/deleteSlides";
import {moveSlides} from "../functions/moveSlides";

describe('moveSlides', () => {
    test('Move before element in the middle, Successfully moved elements', () => {

        // Arrange
        let initialEditor: Editor = {
            Presentation: {
                Name: "Name",
                Slides: [
                    {
                        Id: 1,
                        Elements: [
                            <Text>{
                                Id: 1,
                                Text: '123',
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
                        SelectionElementsId: [],
                        Background: <Color>{}
                    },
                    {
                        Id: 2,
                        Elements: [
                            <Triangle>{
                                Id: 2,
                                A: <Point>{},
                                B: <Point>{},
                                C: <Point>{},
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                BackgroundColor: WHITE,
                                Type: ElementType.triangle
                            }
                        ],
                        SelectionElementsId: [],
                        Background: <Color>{}
                    },
                    {
                        Id: 3,
                        Elements: [
                            <Triangle>{
                                Id: 2,
                                A: <Point>{},
                                B: <Point>{},
                                C: <Point>{},
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                BackgroundColor: WHITE,
                                Type: ElementType.triangle
                            }
                        ],
                        SelectionElementsId: [],
                        Background: <Color>{}
                    },
                    {
                        Id: 4,
                        Elements: [
                            <Triangle>{
                                Id: 2,
                                A: <Point>{},
                                B: <Point>{},
                                C: <Point>{},
                                Position: {
                                    X: 10,
                                    Y: 20
                                },
                                scaleX: 20,
                                scaleY: 30,
                                angleRoute: 20,
                                BorderColor: WHITE,
                                BackgroundColor: WHITE,
                                Type: ElementType.triangle
                            }
                        ],
                        SelectionElementsId: [],
                        Background: <Color>{}
                    },
                ]
            },
            SelectionSlidesId: []
        }
        let expectedEditor: Editor = {
            Presentation: {
                Name: "Name",
                Slides: [
                    {
                        Id: 1,
                        Elements: [
                            <Text>{
                                Id: 1,
                                Text: '123',
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
                        SelectionElementsId: [],
                        Background: <Color>{}
                    },
                    {
                        Id: 2,
                        Elements: [
                            <Triangle>{
                                Id: 2,
                                A: <Point>{},
                                B: <Point>{},
                                C: <Point>{},
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                BackgroundColor: WHITE,
                                Type: ElementType.triangle
                            }
                        ],
                        SelectionElementsId: [],
                        Background: <Color>{}
                    },
                    {
                        Id: 3,
                        Elements: [
                            <Triangle>{
                                Id: 2,
                                A: <Point>{},
                                B: <Point>{},
                                C: <Point>{},
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                BackgroundColor: WHITE,
                                Type: ElementType.triangle
                            }
                        ],
                        SelectionElementsId: [],
                        Background: <Color>{}
                    },
                    {
                        Id: 4,
                        Elements: [
                            <Triangle>{
                                Id: 2,
                                A: <Point>{},
                                B: <Point>{},
                                C: <Point>{},
                                Position: {
                                    X: 10,
                                    Y: 20
                                },
                                scaleX: 20,
                                scaleY: 30,
                                angleRoute: 20,
                                BorderColor: WHITE,
                                BackgroundColor: WHITE,
                                Type: ElementType.triangle
                            }
                        ],
                        SelectionElementsId: [],
                        Background: <Color>{}
                    }
                ]
            },
            SelectionSlidesId: []
        }
        let listSlides = [2, 3]
        let slideInsertId = 1

        // Act
        let actualEditor = moveSlides(initialEditor, listSlides, slideInsertId);

        // Assert
        expect(actualEditor).toStrictEqual(expectedEditor)
    })

    test('Move before last element, Successfully moved elements', () => {

        // Arrange
        let initialEditor: Editor = {
            Presentation: {
                Name: "Name",
                Slides: [
                    {
                        Id: 1,
                        Elements: [
                            <Text>{
                                Id: 1,
                                Text: '123',
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
                        SelectionElementsId: [],
                        Background: <Color>{}
                    },
                    {
                        Id: 2,
                        Elements: [
                            <Triangle>{
                                Id: 2,
                                A: <Point>{},
                                B: <Point>{},
                                C: <Point>{},
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                BackgroundColor: WHITE,
                                Type: ElementType.triangle
                            }
                        ],
                        SelectionElementsId: [],
                        Background: <Color>{}
                    },
                    {
                        Id: 3,
                        Elements: [
                            <Triangle>{
                                Id: 2,
                                A: <Point>{},
                                B: <Point>{},
                                C: <Point>{},
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                BackgroundColor: WHITE,
                                Type: ElementType.triangle
                            }
                        ],
                        SelectionElementsId: [],
                        Background: <Color>{}
                    },
                    {
                        Id: 4,
                        Elements: [
                            <Triangle>{
                                Id: 2,
                                A: <Point>{},
                                B: <Point>{},
                                C: <Point>{},
                                Position: {
                                    X: 10,
                                    Y: 20
                                },
                                scaleX: 20,
                                scaleY: 30,
                                angleRoute: 20,
                                BorderColor: WHITE,
                                BackgroundColor: WHITE,
                                Type: ElementType.triangle
                            }
                        ],
                        SelectionElementsId: [],
                        Background: <Color>{}
                    },
                ]
            },
            SelectionSlidesId: []
        }
        let expectedEditor: Editor = {
            Presentation: {
                Slides: [
                    {
                        Id: 1,
                        Elements: [
                            <Text>{
                                Id: 1,
                                Text: '123',
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
                        SelectionElementsId: [],
                        Background: <Color>{}
                    },
                    {
                        Id: 4,
                        Elements: [
                            <Triangle>{
                                Id: 2,
                                A: <Point>{},
                                B: <Point>{},
                                C: <Point>{},
                                Position: {
                                    X: 10,
                                    Y: 20
                                },
                                scaleX: 20,
                                scaleY: 30,
                                angleRoute: 20,
                                BorderColor: WHITE,
                                BackgroundColor: WHITE,
                                Type: ElementType.triangle
                            }
                        ],
                        SelectionElementsId: [],
                        Background: <Color>{}
                    },
                    {
                        Id: 2,
                        Elements: [
                            <Triangle>{
                                Id: 2,
                                A: <Point>{},
                                B: <Point>{},
                                C: <Point>{},
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                BackgroundColor: WHITE,
                                Type: ElementType.triangle
                            }
                        ],
                        SelectionElementsId: [],
                        Background: <Color>{}
                    },
                    {
                        Id: 3,
                        Elements: [
                            <Triangle>{
                                Id: 2,
                                A: <Point>{},
                                B: <Point>{},
                                C: <Point>{},
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                BackgroundColor: WHITE,
                                Type: ElementType.triangle
                            }
                        ],
                        SelectionElementsId: [],
                        Background: <Color>{}
                    }
                ]
            },
            SelectionSlidesId: []
        }
        let listSlides = [2, 3]
        let slideInsertId = 4

        // Act
        let actualEditor = moveSlides(initialEditor, listSlides, slideInsertId);

        // Assert
        expect(actualEditor).toStrictEqual(expectedEditor)
    })

    test('"slideInsertId" in "listSlides", Error', () => {

        // Arrange
        let initialEditor: Editor = {
            Presentation: {
                Name: "Name",
                Slides: [
                    {
                        Id: 1,
                        Elements: [
                            <Text>{
                                Id: 1,
                                Text: '123',
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
                        SelectionElementsId: [],
                        Background: <Color>{}
                    },
                    {
                        Id: 2,
                        Elements: [
                            <Triangle>{
                                Id: 2,
                                A: <Point>{},
                                B: <Point>{},
                                C: <Point>{},
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                BackgroundColor: WHITE,
                                Type: ElementType.triangle
                            }
                        ],
                        SelectionElementsId: [],
                        Background: <Color>{}
                    },
                    {
                        Id: 3,
                        Elements: [
                            <Triangle>{
                                Id: 2,
                                A: <Point>{},
                                B: <Point>{},
                                C: <Point>{},
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                BackgroundColor: WHITE,
                                Type: ElementType.triangle
                            }
                        ],
                        SelectionElementsId: [],
                        Background: <Color>{}
                    },
                    {
                        Id: 4,
                        Elements: [
                            <Triangle>{
                                Id: 2,
                                A: <Point>{},
                                B: <Point>{},
                                C: <Point>{},
                                Position: {
                                    X: 10,
                                    Y: 20
                                },
                                scaleX: 20,
                                scaleY: 30,
                                angleRoute: 20,
                                BorderColor: WHITE,
                                BackgroundColor: WHITE,
                                Type: ElementType.triangle
                            }
                        ],
                        SelectionElementsId: [],
                        Background: <Color>{}
                    },
                ]
            },
            SelectionSlidesId: []
        }
        let listSlides = [2, 3]
        let slideInsertId = 2

        // Act
        let callingFunction = () => moveSlides(initialEditor, listSlides, slideInsertId);

        // Assert
        expect(callingFunction).toThrow('"slideInsertId" cannot be in "listSlides"')
    })
})