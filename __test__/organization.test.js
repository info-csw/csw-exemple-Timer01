const fs = require("fs");
const path = require("path");

class DirectoryValidator {
    constructor (rootPath) {
        this.rootPath = rootPath;
        this.dirExtensions = {};
        this.extensionTypes = {
            ".html": "html",
            ".htm": "html",
            ".php": "html",
            ".css": "css",
            ".jpg": "image",
            ".jpeg": "image",
            ".png": "image",
            ".gif": "image",
            ".bmp": "image",
            ".tiff": "image",
            ".svg": "image",
            ".webp": "image",
            ".js": "js"
            // Add other extensions as needed...
        };
    }

    validate () {
        return this.validateDirectory(this.rootPath);
    }
    
    validateDirectory (directoryPath) {
        const dirContents = fs.readdirSync(directoryPath);
        for (const item of dirContents) {
            const itemPath = path.join(directoryPath, item);
            if (fs.lstatSync(itemPath).isFile()) {
                this.validateFile(itemPath, directoryPath);
            } else {
                this.validateDirectory(itemPath);
            }
        }
    }

    validateFile (filePath, directoryPath) {
        const fileExt = path.extname(filePath);
        const fileType = this.extensionTypes[fileExt];
        if (!this.dirExtensions[directoryPath]) {
            this.dirExtensions[directoryPath] = fileType;
            test(`At least one no-empty directory ${directoryPath}`, () => {})
        } 
        else {
            test(`Files must be same types in directory ${directoryPath}`, () => {
                expect(fileType).toBe(this.dirExtensions[directoryPath]);
            })
        }
    }
}

describe("File structure", () => {
    const validator = new DirectoryValidator("./dist");
    validator.validate();
});
