import {ImageElement} from "../entities/Elements"

export function imageInitAfterOnload(img: HTMLImageElement, copyImage: ImageElement): ImageElement {
    let imgWidth: number
    let imgHeight: number
    if (img.width > img.height) {
        if (img.width >= 1000) {
            imgWidth = img.width
            imgHeight = img.height
        } else {
            if (Math.floor(img.height / 9 * 16 / img.width * 100) / 100 >= 1) {
                imgWidth = img.width / 10
                imgHeight = Math.floor(img.height / 9 * 16 / 10 * 100) / 100
            } else {
                imgWidth = img.width / 10
                imgHeight = img.height / 10
            }
        }
    } else {
        if (img.height / 9 * 16 >= 1000) {
            imgWidth = img.width
            imgHeight = img.height
        } else {
            imgWidth = img.width / 10
            imgHeight = Math.floor(img.height / 9 * 16 / 10 * 100) / 100
        }
    }

    copyImage.bottomRightPoint.x = imgWidth
    copyImage.bottomRightPoint.y = imgHeight

    /*let width = copyImage.bottomRightPoint.x - copyImage.topLeftPoint.x
    let height = copyImage.bottomRightPoint.y - copyImage.topLeftPoint.y
    if (width > height) {
        if (width >= 100) {
            width = 100
            height = 100
        } else {
            width = Math.floor(width*10/16*9/10*100)/100
        }
    } else {
        if (height >= 100) {
            width = 100
            height = 100
        }
    }

    copyImage.bottomRightPoint.x = width + copyImage.topLeftPoint.x
    copyImage.bottomRightPoint.y = height + copyImage.topLeftPoint.y*/

    return copyImage
}