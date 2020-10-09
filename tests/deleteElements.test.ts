import {Editor} from '../entities/Editor'
import {Color} from '../entities/Color'
import {ElementType, Triangle} from '../entities/Elements'
import {Text} from '../entities/Elements'
import {Point} from '../entities/Point'
import {Ellipse} from '../entities/Elements'
import {RED, WHITE} from '../entities/Constants'
import {deleteElements} from '../functions/deleteElements'

describe('deleteElements', () => {
    test('No removed elements, No changes', () => {

        // Arrange
        let expectedEditor: Editor = {
            presentation: {
                name: "Name",
                slides: [
                    {
                        id: 1,
                        elements: [
                            <Text>{
                                id: 1,
                                text: '123',
                                textStyle: {
                                    font: 'Robot',
                                    sizeFont: 18,
                                    color: RED,
                                    align: 'Center',
                                    isBold: false,
                                    isCurve: false
                                },
                                position: {
                                    x: 0,
                                    y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                borderColor: WHITE,
                                type: ElementType.text
                            },
                            <Triangle>{
                                id: 2,
                                a: <Point>{},
                                b: <Point>{},
                                c: <Point>{},
                                position: {
                                    x: 0,
                                    y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                borderColor: WHITE,
                                backgroundColor: WHITE,
                                type: ElementType.triangle
                            },
                        ],
                        selectionElementsId: [],
                        background: <Color>{}
                    }
                ]
            },
            selectionSlidesId: []
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
            presentation: {
                name: "Name",
                slides: [
                    {
                        id: 1,
                        elements: [
                            <Text>{
                                id: 1,
                                text: '123',
                                textStyle: {
                                    font: 'Robot',
                                    sizeFont: 18,
                                    color: RED,
                                    align: 'Center',
                                    isBold: false,
                                    isCurve: false
                                },
                                position: {
                                    x: 0,
                                    y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                borderColor: WHITE,
                                type: ElementType.text
                            },
                            <Triangle>{
                                id: 2,
                                a: <Point>{},
                                b: <Point>{},
                                c: <Point>{},
                                position: {
                                    x: 0,
                                    y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                borderColor: WHITE,
                                backgroundColor: WHITE,
                                type: ElementType.triangle
                            },
                            <Ellipse>{
                                id: 3,
                                radiusX: 10,
                                radiusY: 10,
                                position: {
                                    x: 0,
                                    y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                borderColor: WHITE,
                                backgroundColor: WHITE,
                                type: ElementType.ellipse
                            },
                        ],
                        selectionElementsId: [],
                        background: <Color>{}
                    }
                ]
            },
            selectionSlidesId: []
        }
        let expectedEditor: Editor = {
            presentation: {
                name: "Name",
                slides: [
                    {
                        id: 1,
                        elements: [
                            <Triangle>{
                                id: 2,
                                a: <Point>{},
                                b: <Point>{},
                                c: <Point>{},
                                position: {
                                    x: 0,
                                    y: 0
                                },
                                scaleX: 0,
                                scaleY: 0,
                                angleRoute: 0,
                                borderColor: WHITE,
                                backgroundColor: WHITE,
                                type: ElementType.triangle
                            }
                        ],
                        selectionElementsId: [],
                        background: <Color>{}
                    }
                ]
            },
            selectionSlidesId: []
        }

        // Act
        let indexOfDeletedElements = [1, 3]
        let actualEditor = deleteElements(initialEditor, 1, indexOfDeletedElements)

        // Assert
        expect(actualEditor).toStrictEqual(expectedEditor)
    })
})