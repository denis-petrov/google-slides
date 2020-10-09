import {addEmptySlide} from '../functions/addEmptySlide'
import {WHITE} from '../entities/Constants'

describe('test Empty slide', () => {
    test('add empty slide', () => {

        // Arrange
        let expectedEditor = {
            presentation: {
                name: 'test',
                slides: [
                    {
                        id: 0,
                        elements: [],
                        background: WHITE,
                        selectionElementsId: []
                    }
                ]
            },
            selectionSlidesId: [0]
        }

        // Act
        let emptyEditor = {
            presentation: {
                name: 'test',
                slides: []
            },
            selectionSlidesId: [0]
        }
        let result = addEmptySlide(emptyEditor)

        // Assert
        expect(result).toEqual(expectedEditor)
    })

    test('add more one empty slide for test id', () => {

        // Arrange
        let expectedEditor = {
            presentation: {
                name: 'test',
                slides: [
                    {
                        id: 0,
                        elements: [],
                        background: WHITE,
                        selectionElementsId: []
                    },
                    {
                        id: 1,
                        elements: [],
                        background: WHITE,
                        selectionElementsId: []
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
                        background: WHITE,
                        selectionElementsId: []
                    }
                ]
            },
            selectionSlidesId: [0]
        }
        let result = addEmptySlide(emptyEditor)

        // Assert
        expect(result).toEqual(expectedEditor)
    })
})

