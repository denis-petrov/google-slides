import {addColorToBackground} from '../functions/addColorToBackground'
import {WHITE} from '../entities/Constants'

describe('test add color to background', () => {
    test('change black to white', () => {

        // Arrange
        let expectedEditor = {
            Presentation: {
                Name: 'test',
                Slides: [
                    {
                        Id: 0,
                        Elements: null,
                        Background: {
                            Red: 255,
                            Green: 255,
                            Blue: 255
                        },
                        SelectionElementsId: null
                    }
                ]
            },
            SelectionSlidesId: [0, 1, 2]
        }

        // Act
        let emptyEditor = {
            Presentation: {
                Name: 'test',
                Slides: [
                    {
                        Id: 0,
                        Elements: null,
                        Background: {
                            Red: 0,
                            Green: 0,
                            Blue: 0
                        },
                        SelectionElementsId: null
                    }
                ]
            },
            SelectionSlidesId: [0, 1, 2]
        }
        let result = addColorToBackground(emptyEditor, WHITE, 0)

        // Assert
        expect(result).toStrictEqual(expectedEditor)
    })
})

