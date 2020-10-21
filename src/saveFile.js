import {savePresentationToPc} from './functions/savePresentationToPc';

export function saveFile() {
    let testJson = {
        "name": "Molecule Man",
        "age": 29,
        "secretIdentity": "Dan Jukes",
        "powers": [
            "Radiation resistance",
            "Turning tiny",
            "Radiation blast"
        ]
    };
    let fileName = 'test.json';
    const fileType = 'json';
    savePresentationToPc(testJson, fileName, fileType);
}
