import './App.css';
import {ParsedObject} from "./App";

export default class LineParser {

    static parseLine = (input: any) => {
        var splittedLine = input.split(';');
        if (splittedLine.length < 5) {
            console.log(`Something is wrong with splitted line. Missing some data`);
            return null;
        } else {
            var line = splittedLine[0];
            var column = splittedLine[1];
            var label = splittedLine[2];
            var type = splittedLine[3];
            var value = splittedLine[4];
            console.log(`splitted line matches validation, printing values: line:${line},column:${column}, label:${label}, type:${type}, value:${value}`);
            return new ParsedObject(type, label, value, line, column);
        }
    }

    static sortLines = (parsedLines: ParsedObject[]): ParsedObject[] => {
        return parsedLines.slice().sort((a, b) => {
            if (a.line === b.line) {
                return a.column - b.column;
            }
            return a.line - b.line;
        });
    }

    static buildParsedObjectsArray = (lines: any) => {
        var parsedObjectArray: ParsedObject[] = [];
        for (var i = 0; i < lines.length; i++) {
            var parsedObject: ParsedObject | null = LineParser.parseLine(lines[i]);
            if (parsedObject !== null) {
                parsedObjectArray.push(parsedObject);
            }
        }
        return parsedObjectArray;
    }

    static parseLines(lines: any): ParsedObject[] {
        var parsedObjectArray = LineParser.buildParsedObjectsArray(lines);
        return LineParser.sortLines(parsedObjectArray);
    }
}

