import React, {useState} from 'react';
import './App.css';

class ParsedObject {
    type: string;
    label: string;
    value: string;
    line: number;
    column: number;

    constructor(type: string, label: string, value: string, line: number, column: number) {
        this.type = type;
        this.label = label;
        this.value = value;
        this.line = line;
        this.column = column;
    }
}

// @ts-ignore
const GridComponent = ({items}) => {

    const printSelectOptions = (element: any) => {
        return <select>
            {element.value.split(',').map((option: any, index: any) => {
                return (<option>{option}</option>)
            })}
        </select>;
    }

    const printTextInput = (element: any) => {
        return (
            <input placeholder={element.value}/>);
    }

    const printElement = (element: any) => {
        return <>
            {element.type === 'TEXT_INPUT' ?
                printTextInput(element) :
                printSelectOptions(element)}
        </>;
    }

    const gridElement = (index: any, element: any) => {
        return (
            <div key={index}>
                <p>{element.label}</p>
                {printElement(element)}
            </div>
        );
    }

    return (
        <div>
            <ul>
                {items.map((element: any, index: any) => {
                    return gridElement(index, element);
                })}
            </ul>
        </div>
    );
}

function App() {

    const [parsedLines, setParsedLines] = useState([new ParsedObject("", "", "", 0, 0)]);

    const parseLine = (input: any) => {
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

    const sortLines = (parsedLines: ParsedObject[]): ParsedObject[] => {
        return parsedLines.slice().sort((a, b) => {
            if (a.line === b.line) {
                return a.column - b.column;
            }
            return a.line - b.line;
        });
    }

    const buildParsedObjectsArray = (lines: any) => {
        var parsedObjectArray: ParsedObject[] = [];
        for (var i = 0; i < lines.length; i++) {
            var parsedObject: ParsedObject | null = parseLine(lines[i]);
            if (parsedObject !== null) {
                parsedObjectArray.push(parsedObject);
            }
        }
        return parsedObjectArray;
    }

    const drawElements = (event: any) => {
        var lines = event.target.value.split('\n');
        var parsedObjectArray = buildParsedObjectsArray(lines);
        var sortedParsedLines = sortLines(parsedObjectArray);
        setParsedLines(sortedParsedLines);
    }

    return (
        <div className="App">
            <div>
                <textarea rows={5} cols={50} onChange={drawElements}/>
                <GridComponent items={parsedLines}/>
            </div>
        </div>
    );
}

export default App;
