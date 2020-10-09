import {chooseElements} from '../functions/chooseElements'
import {RED, GREEN, WHITE} from '../entities/Constants'
import {ElementType} from '../entities/Elements'

describe('test choose elements', () => {
    test('choose two elements', () => {

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
                                    x: 0,
                                    y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                borderColor: WHITE,
                                type: ElementType.text,
                                text: 'Test 1 by Andrey',
                                textStyle: {
                                    font: 'Times New Roman',
                                    sizeFont: 14,
                                    color: GREEN,
                                    align: 'Left',
                                    isBold: true,
                                    isCurve: false
                                }
                            },
                            {
                                id: 2,
                                position: {
                                    x: 0,
                                    y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                borderColor: WHITE,
                                type: ElementType.rectangle,
                                width: 100,
                                height: 100,
                                backgroundColor: RED
                            },
                        ],
                        background: WHITE,
                        selectionElementsId: [1, 2]
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
                                    x: 0,
                                    y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                borderColor: WHITE,
                                type: ElementType.text,
                                text: 'Test 1 by Andrey',
                                textStyle: {
                                    font: 'Times New Roman',
                                    sizeFont: 14,
                                    color: GREEN,
                                    align: 'Left',
                                    isBold: true,
                                    isCurve: false
                                }
                            },
                            {
                                id: 2,
                                position: {
                                    x: 0,
                                    y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                borderColor: WHITE,
                                type: ElementType.rectangle,
                                width: 100,
                                height: 100,
                                backgroundColor: RED
                            },
                        ],
                        background: WHITE,
                        selectionElementsId: []
                    }
                ]
            },
            selectionSlidesId: [1]
        }
        let result = chooseElements(fullEditor, [1, 2])

        // Assert
        expect(result).toStrictEqual(expectedEditor)
    })
})
