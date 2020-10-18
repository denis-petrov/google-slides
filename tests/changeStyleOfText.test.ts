import {changeStyleOfText} from '../src/functions/changeStyleOfText'
import {ElementType} from '../src/entities/Elements'
import {GREEN} from '../src/entities/Constants'

describe('test change element text style', () => {
    test('change font from Times New Roman to Arial, Color from black to green, sizeFont from 10 to 16, ' +
        'align from Right to Left, isBold from false to true, isCurve from false to true', () => {

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
                                text: 'Test 3 by Andrey',
                                textStyle: {
                                    font: 'Arial',
                                    sizeFont: 16,
                                    color: {
                                        red: 0,
                                        green: 255,
                                        blue: 0
                                    },
                                    align: 'Left',
                                    isBold: true,
                                    isCurve: true
                                }
                            }
                        ],
                        background: {
                            red: 255,
                            green: 255,
                            blue: 255
                        },
                        selectionElementsId: [1]
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
                                text: 'Test 3 by Andrey',
                                textStyle: {
                                    font: 'Times New Roman',
                                    sizeFont: 10,
                                    color: {
                                        red: 0,
                                        green: 0,
                                        blue: 0
                                    },
                                    align: 'Right',
                                    isBold: false,
                                    isCurve: false
                                }
                            }
                        ],
                        background: {
                            red: 255,
                            green: 255,
                            blue: 255
                        },
                        selectionElementsId: [1]
                    }
                ]
            },
            selectionSlidesId: [1]
        }

        let result = changeStyleOfText(
            fullEditor,
            [1],
            {font: 'Arial', sizeFont: 16, color: GREEN, align: 'Left', isBold: true, isCurve: true}
            )

        // Assert
        expect(result).toStrictEqual(expectedEditor)
    })
})
