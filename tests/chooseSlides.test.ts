import {chooseSlides} from '../functions/chooseSlides'
import {Editor} from '../entities/Editor'
import {Presentation} from '../entities/Presentation'

describe('chooseSlide', () => {
    test('No slide selected, No slides are selected', () => {

        // Arrange
        let expectedEditor: Editor = {
            presentation: {} as Presentation,
            selectionSlidesId: []
        }
        let initialEditor: Editor = { ...expectedEditor }

        // Act
        let actualEditor = chooseSlides(initialEditor, [])

        // Assert
        expect(actualEditor).toStrictEqual(expectedEditor)
    })

    test('Multiple slides selected, These slides are added to SelectedSlidesId', () => {

        // Arrange
        let expectedEditor: Editor = {
            presentation: {} as Presentation,
            selectionSlidesId: [1 , 2, 3]
        }

        // Act
        let initialEditor: Editor = {
            presentation: {} as Presentation,
            selectionSlidesId: [4, 5]
        }
        let selectedElementsId = [1, 2, 3]
        let actualEditor = chooseSlides(initialEditor, selectedElementsId);

        // Assert
        expect(actualEditor).toStrictEqual(expectedEditor)
    })
})