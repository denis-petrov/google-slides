import {Editor} from "../entities/Editor"
import {Color} from "../entities/Color"
import {ElementType, Triangle} from "../entities/Elements"
import {Text} from "../entities/Elements"
import {Point} from "../entities/Point"
import {RED, WHITE} from "../entities/Constants"
import {deleteSlides} from "../functions/deleteSlides";

describe('deleteSlides', () => {
    test('Multiple removed slides, Needed slides are removed', () => {

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
                                    Color: RED,
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
                    }
                ]
            },
            SelectionSlidesId: []
        }
        let expectedEditor: Editor = {
            Presentation: {
                Name: "Name",
                Slides: [
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
                    }
                ]
            },
            SelectionSlidesId: []
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
                                    Color: RED,
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
                    }
                ]
            },
            SelectionSlidesId: []
        }
        let expectedEditor: Editor = { ...initialEditor }
        let slidesIdForDeleting: Array<number> = []

        // Act
        let actualEditor = deleteSlides(initialEditor, slidesIdForDeleting)

        // Assert
        expect(actualEditor).toStrictEqual(expectedEditor)
    })
})
