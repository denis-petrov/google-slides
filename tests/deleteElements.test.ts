import {Editor} from "../entities/Editor"
import {Color} from "../entities/Color"
import {ElementType, Triangle} from "../entities/Elements"
import {Text} from "../entities/Elements"
import {Point} from "../entities/Point"
import {Ellipse} from "../entities/Elements"
import {RED, WHITE} from "../entities/Constants"
import {deleteElements} from "../functions/deleteElements"

describe('deleteElements', () => {
    test('No removed elements, No changes', () => {

        // Arrange
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
                            },
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
                            },
                        ],
                        SelectionElementsId: [],
                        Background: <Color>{}
                    }
                ]
            },
            SelectionSlidesId: []
        }
        let initialEditor: Editor = { ...expectedEditor }

        // Act
        let actualEditor = deleteElements(initialEditor, 1, [])

        // Assert
        expect(actualEditor).toStrictEqual(expectedEditor)
    })

    test('Multiple removed elements, Needed elements are removed', () => {

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
                            },
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
                            },
                            <Ellipse>{
                                Id: 3,
                                RadiusX: 10,
                                RadiusY: 10,
                                Position: {
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                BackgroundColor: WHITE,
                                Type: ElementType.ellipse
                            },
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
                        Id: 1,
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

        // Act
        let indexOfDeletedElements = [1, 3]
        let actualEditor = deleteElements(initialEditor, 1, indexOfDeletedElements)

        // Assert
        expect(actualEditor).toStrictEqual(expectedEditor)
    })
})