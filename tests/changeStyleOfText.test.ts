import {changeStyleOfText} from '../functions/changeStyleOfText'
import {ElementType} from '../entities/Elements'
import {GREEN} from '../entities/Constants'

describe('test change element text style', () => {
    test('change Font from Times New Roman to Arial, Color from black to green, sizeFont from 10 to 16, ' +
        'Align from Right to Left, isBold from false to true, isCurve from false to true', () => {

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
                                Text: 'Test 3 by Andrey',
                                TextStyle: {
                                    Font: 'Arial',
                                    SizeFont: 16,
                                    Color: {
                                        Red: 0,
                                        Green: 255,
                                        Blue: 0
                                    },
                                    Align: 'Left',
                                    isBold: true,
                                    isCurve: true
                                }
                            }
                        ],
                        Background: {
                            Red: 255,
                            Green: 255,
                            Blue: 255
                        },
                        SelectionElementsId: [1]
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
                                Text: 'Test 3 by Andrey',
                                TextStyle: {
                                    Font: 'Times New Roman',
                                    SizeFont: 10,
                                    Color: {
                                        Red: 0,
                                        Green: 0,
                                        Blue: 0
                                    },
                                    Align: 'Right',
                                    isBold: false,
                                    isCurve: false
                                }
                            }
                        ],
                        Background: {
                            Red: 255,
                            Green: 255,
                            Blue: 255
                        },
                        SelectionElementsId: [1]
                    }
                ]
            },
            SelectionSlidesId: [1]
        }

        let result = changeStyleOfText(fullEditor, [1], {Font: 'Arial', SizeFont: 16, Color: GREEN,
            Align: 'Left', isBold: true, isCurve: true})

        // Assert
        expect(result).toStrictEqual(expectedEditor)
    })
})
