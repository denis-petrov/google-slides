import {addColorToBackground} from '../src/functions/addColorToBackground'
import {BLACK, WHITE} from '../src/entities/Constants'

describe('test add color to background', () => {
    test('change black to white', () => {

        // Arrange
        let expectedEditor = {
            presentation: {
                name: 'test',
                slides: [
                    {
                        id: 0,
                        elements: [],
                        background: WHITE,
                        selectionElementsId: [0]
                    }
                ]
            },
            selectionSlidesId: [0]
        }

        // Act
        let emptyEditor = {
            presentation: {
                name: 'test',
                slides: [
                    {
                        id: 0,
                        elements: [],
                        background: BLACK,
                        selectionElementsId: [0]
                    }
                ]
            },
            selectionSlidesId: [0]
        }
        let result = addColorToBackground(emptyEditor, WHITE)

        // Assert
        expect(result).toEqual(expectedEditor)
    })

    test('change specter red to 100', () => {

        // Arrange
        let expectedEditor = {
            presentation: {
                name: 'test',
                slides: [
                    {
                        id: 0,
                        elements: [],
                        background: {
                            red: 100,
                            green: 0,
                            blue: 0
                        },
                        selectionElementsId: [0]
                    }
                ]
            },
            selectionSlidesId: [0]
        }

        // Act
        let emptyEditor = {
            presentation: {
                name: 'test',
                slides: [
                    {
                        id: 0,
                        elements: [],
                        background: {
                            red: 0,
                            green: 0,
                            blue: 0
                        },
                        selectionElementsId: [0]
                    }
                ]
            },
            selectionSlidesId: [0]
        }
        let result = addColorToBackground(emptyEditor, {red: 100, green: 0, blue: 0})

        // Assert
        expect(result).toEqual(expectedEditor)
    })

    test('change specter green to 50', () => {

        // Arrange
        let expectedEditor = {
            presentation: {
                name: 'test',
                slides: [
                    {
                        id: 0,
                        elements: [],
                        background: {
                            red: 0,
                            green: 50,
                            blue: 0
                        },
                        selectionElementsId: [0]
                    }
                ]
            },
            selectionSlidesId: [0]
        }

        // Act
        let emptyEditor = {
            presentation: {
                name: 'test',
                slides: [
                    {
                        id: 0,
                        elements: [],
                        background: {
                            red: 0,
                            green: 0,
                            blue: 0
                        },
                        selectionElementsId: [0]
                    }
                ]
            },
            selectionSlidesId: [0]
        }
        let result = addColorToBackground(emptyEditor, {red: 0, green: 50, blue: 0})

        // Assert
        expect(result).toEqual(expectedEditor)
    })

    test('change specter blue to 170', () => {

        // Arrange
        let expectedEditor = {
            presentation: {
                name: 'test',
                slides: [
                    {
                        id: 0,
                        elements: [],
                        background: {
                            red: 0,
                            green: 0,
                            blue: 170
                        },
                        selectionElementsId: [0]
                    }
                ]
            },
            selectionSlidesId: [0]
        }

        // Act
        let emptyEditor = {
            presentation: {
                name: 'test',
                slides: [
                    {
                        id: 0,
                        elements: [],
                        background: {
                            red: 0,
                            green: 0,
                            blue: 0
                        },
                        selectionElementsId: [0]
                    }
                ]
            },
            selectionSlidesId: [0]
        }
        let result = addColorToBackground(emptyEditor, {red: 0, green: 0, blue: 170})

        // Assert
        expect(result).toEqual(expectedEditor)
    })
})

