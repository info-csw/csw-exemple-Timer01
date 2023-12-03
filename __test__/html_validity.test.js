const fs = require("fs");
const path = require("path");
const util = require("util");
const chalk = require("chalk");
const HTMLValidator = require("html-validator");

const validateHTML = async (html) => {
    //const validator = new HTMLValidator();
    const options = {
        data: html,
        format: "json"
    };
    const result = await HTMLValidator(options);
    return result;
};

const extensionHTML = ['.html','.htm'];

describe("HTML validation", () => {

    const htmlFiles = fs.readdirSync("dist");

    if (htmlFiles.length>0) {
        test.each(htmlFiles)("should be valid HTML for file %s", async (file) => {
            //if (path.extname(file) === ".html") {
            if (extensionHTML.includes(path.extname(file))) {
                const html = fs.readFileSync(path.join("dist", file), "utf8");
                const validationResults = await validateHTML(html);
                if (validationResults.messages.length > 0) {
                    title("Start W3C Validation for " + file + " :");
                    validationResults.messages.every((message) => {
                        if (message.type=="error")
                            error(message.lastLine + ":" + message.lastColumn, message.message);
                        else
                            warning(message.lastLine + ":" + message.lastColumn, message.message);
                        return true;
                    });
                    title("End W3C Validation for " + file);
                }
    
                let lengthMessage = validationResults.messages.length;
                expect(lengthMessage).toBe(0);
            }
        });
    }
    else {
        test('no file to check', () => {
            expect(htmlFiles).toHaveLength(0);
        });
    }
});

function error(pos,message) {
    process.stdout.write(chalk.grey(pos) + chalk.red("\terror\t") + message + "\n");
}

function warning(pos,message) {
    process.stdout.write(chalk.grey(pos) + chalk.hex("#eb9b34")("\twarning\t") + message + "\n");
}
/*
function warning(message) {
    process.stdout.write(chalk.bgHex("#eb9b34").bold("WARNING :") + chalk.hex("#eb9b34")(" " + message + "\n"));
    //process.stdout.write(chalk.bgHex("#eb9b34").bold("\n" + message + "\n"));
}
*/

function title(message) {
    process.stdout.write(chalk.bgYellow.bold.black.italic("\n\t " + message + " \t\n\n"));
}