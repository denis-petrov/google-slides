import {addColorToBackground} from '../functions/addColorToBackground'
import {BLACK, WHITE} from '../entities/Constants'

describe('test add color to background', () => {
    test('change black to white', () => {

        // Arrange
        let expectedEditor = {
            Presentation: {
                Name: 'test',
                Slides: [
                    {
                        Id: 0,
                        Elements: [],
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
                        Elements: [],
                        Background: BLACK,
                        SelectionElementsId: [0]
                    }
                ]
            },
            SelectionSlidesId: [0]
        }
        let result = addColorToBackground(emptyEditor, WHITE)

        // Assert
        expect(result).toEqual(expectedEditor)
    })

    test('change specter Red to 100', () => {

        // Arrange
        let expectedEditor = {
            Presentation: {
                Name: 'test',
                Slides: [
                    {
                        Id: 0,
                        Elements: [],
                        Background: {
                            Red: 100,
                            Green: 0,
                            Blue: 0
                        },
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
                        Elements: [],
                        Background: {
                            Red: 0,
                            Green: 0,
                            Blue: 0
                        },
                        SelectionElementsId: [0]
                    }
                ]
            },
            SelectionSlidesId: [0]
        }
        let result = addColorToBackground(emptyEditor, {Red: 100, Green: 0, Blue: 0})

        // Assert
        expect(result).toEqual(expectedEditor)
    })

    test('change specter Green to 50', () => {

        // Arrange
        let expectedEditor = {
            Presentation: {
                Name: 'test',
                Slides: [
                    {
                        Id: 0,
                        Elements: [],
                        Background: {
                            Red: 0,
                            Green: 50,
                            Blue: 0
                        },
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
                        Elements: [],
                        Background: {
                            Red: 0,
                            Green: 0,
                            Blue: 0
                        },
                        SelectionElementsId: [0]
                    }
                ]
            },
            SelectionSlidesId: [0]
        }
        let result = addColorToBackground(emptyEditor, {Red: 0, Green: 50, Blue: 0})

        // Assert
        expect(result).toEqual(expectedEditor)
    })

    test('change specter Blue to 170', () => {

        // Arrange
        let expectedEditor = {
            Presentation: {
                Name: 'test',
                Slides: [
                    {
                        Id: 0,
                        Elements: [],
                        Background: {
                            Red: 0,
                            Green: 0,
                            Blue: 170
                        },
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
                        Elements: [],
                        Background: {
                            Red: 0,
                            Green: 0,
                            Blue: 0
                        },
                        SelectionElementsId: [0]
                    }
                ]
            },
            SelectionSlidesId: [0]
        }
        let result = addColorToBackground(emptyEditor, {Red: 0, Green: 0, Blue: 170})

        // Assert
        expect(result).toEqual(expectedEditor)
    })
})

