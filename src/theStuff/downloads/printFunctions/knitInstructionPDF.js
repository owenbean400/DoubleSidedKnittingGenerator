import jsPDF from "jspdf";

export default function pdfCreatorKnit(json){
    let string = knitJSONtoInstructionString(json.grid);
    string = printStrings(string);
    string = wrapStringTemplate(string, json.color);
    createDoc(string, "instructions");
}

function wrapStringTemplate(stringInfo, colorArray){
    let keyLegend = "\nK1 = knit one\nP1 = perl one\nC1 = color in rgb of " + colorArray[0] + "\nC2 = color in rgb of " + colorArray[1] + "\nK2-tog = knit two strings together as one" + "\n\n";
    stringInfo = "Owen Bean Knit Instruction Generator \n" + keyLegend + stringInfo;
    return stringInfo;
}

function knitJSONtoInstructionString(jsonInfo) {
    let instuctString = "Cast on " + (Object.values(jsonInfo)[0].length + 1) + " as both colors as one string of yarn which will be " + ((Object.values(jsonInfo)[0].length + 1) * 2) + " individual casted on stitches\n\n";
    for(let row = 0; row < Object.values(jsonInfo).length; row++){
        instuctString += ("Row " + (row + 1) + ": ");
        instuctString += "K2-tog "
        for(let column = 0; column < Object.values(jsonInfo)[row].length; column++){
            if(row % 2 === 0){
                if (Object.values(jsonInfo)[row][column] === 0){
                    instuctString += "K1-C1 P1-C2 ";
                }
                else if (Object.values(jsonInfo)[row][column] === 1){
                    instuctString += "K1-C2 P1-C1 ";
                }
            }
            else{
                if (Object.values(jsonInfo)[row][column] === 1){
                    instuctString += "K1-C1 P1-C2 ";
                }
                else if (Object.values(jsonInfo)[row][column] === 0){
                    instuctString += "K1-C2 P1-C1 ";
                }
            }
        }
        instuctString += "K2-tog\n\n";
    }
    instuctString += "Bind off and weave yarn ends\n\n";
    return instuctString;
}

function printStrings(string){
    let newString = "";
    var amountOfCharInRow = 0;
    for(let i = 0; i < string.length; i++){
        newString += string.charAt(i);
        if(string.charAt(i) === "\n"){
            amountOfCharInRow = 0;
        }
        amountOfCharInRow++;
        if(amountOfCharInRow % 60 === 0 && i > 0){
            newString = newString.slice(0, newString.lastIndexOf(" ")) + "\n  " + newString.slice(newString.lastIndexOf(" ") + 1);
        }
    }
    return newString;
}

function createDoc(string, fileName){
    const doc = new jsPDF();
    let countEnters = 0;
    let stringForPage = "";
    for(let i = 0; i < string.length; i++){
        stringForPage += string.charAt(i);
        if(string.charAt(i) === "\n")
            countEnters++;
        if(countEnters % 44 === 0 && countEnters !== 0){
            doc.text(stringForPage, 10, 10);
            doc.addPage();
            stringForPage = "";
            countEnters = 0;
        }
    }
    doc.text(stringForPage, 10, 10);
    doc.save(fileName);
}