import {addEmptySlide} from '../functions/addEmptySlide'
import {WHITE} from '../entities/Constants'

describe('test Empty slide', () => {
    test('add empty slide', () => {

        // Arrange
        let expectedEditor = {
            Presentation: {
                Name: 'test',
                Slides: [
                    {
                        Id: 0,
                        Elements: [],
                        Background: WHITE,
                        SelectionElementsId: []
                    }
                ]
            },
            SelectionSlidesId: [0]
        }

        // Act
        let emptyEditor = {
            Presentation: {
                Name: 'test',
                Slides: []
            },
            SelectionSlidesId: [0]
        }
        let result = addEmptySlide(emptyEditor)

        // Assert
        expect(result).toEqual(expectedEditor)
    })

    test('add more one empty slide for test Id', () => {

        // Arrange
        let expectedEditor = {
            Presentation: {
                Name: 'test',
                Slides: [
                    {
                        Id: 0,
                        Elements: [],
                        Background: WHITE,
                        SelectionElementsId: []
                    },
                    {
                        Id: 1,
                        Elements: [],
                        Background: WHITE,
                        SelectionElementsId: []
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
                        Background: WHITE,
                        SelectionElementsId: []
                    }
                ]
            },
            SelectionSlidesId: [0]
        }
        let result = addEmptySlide(emptyEditor)

        // Assert
        expect(result).toEqual(expectedEditor)
    })
})

