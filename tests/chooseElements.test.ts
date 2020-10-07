import {chooseElements} from '../functions/chooseElements'
import {GREEN, RED, WHITE} from '../entities/Constants'
import {ElementType} from '../entities/Elements'

describe('test choose elements', () => {
    test('choose two elements', () => {

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
                                    X: 0,
                                    Y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                BorderColor: WHITE,
                                Type: ElementType.text,
                                Text: 'Test 1 by Andrey',
                                TextStyle: {
                                    Font: 'Times New Roman',
                                    SizeFont: 14,
                                    Color: GREEN,
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
                                BorderColor: WHITE,
                                Type: ElementType.rectangle,
                                Width: 100,
                                Height: 100,
                                BackgroundColor: RED
                            },
                        ],
                        Background: WHITE,
                        SelectionElementsId: [1, 2]
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
                                BorderColor: WHITE,
                                Type: ElementType.text,
                                Text: 'Test 1 by Andrey',
                                TextStyle: {
                                    Font: 'Times New Roman',
                                    SizeFont: 14,
                                    Color: GREEN,
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
                                BorderColor: WHITE,
                                Type: ElementType.rectangle,
                                Width: 100,
                                Height: 100,
                                BackgroundColor: RED
                            },
                        ],
                        Background: WHITE,
                        SelectionElementsId: []
                    }
                ]
            },
            SelectionSlidesId: [1]
        }
        let result = chooseElements(fullEditor, [1, 2])

        // Assert
        expect(result).toStrictEqual(expectedEditor)
    })
})
