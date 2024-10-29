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

    function printSelectOptions(element: any) {
        return <select>
            {/*<option>Test</option>*/}
            {element.value.split(',').map((option: any, index: any) => {
                return (<option>{option}</option>)
            })}
        </select>;
    }

    function printElement(element: any) {
        return <>
            {element.type === 'TEXT_INPUT' ?
                (<input placeholder={element.value}></input>) :
                printSelectOptions(element)}
        </>;
    }

    function gridElement(index: any, element: any) {
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

    const [list, setList] = useState([""]);
    const [text, setText] = useState("");

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

    function sortLines(parsedLines: ParsedObject[]): ParsedObject[] {
        return parsedLines.slice().sort((a, b) => {
            if (a.line === b.line) {
                return a.column - b.column;
            }
            return a.line - b.line;
        });
    }

    const handleChangeText = (event: any) => {
        var lines = event.target.value.split('\n');
        var parsedObjectArray: ParsedObject[] = [];

        for (var i = 0; i < lines.length; i++) {
            var parsedObject: ParsedObject | null = parseLine(lines[i]);
            if (parsedObject !== null) {
                parsedObjectArray.push(parsedObject);
            }
        }
        var sortedParsedLines = sortLines(parsedObjectArray);
        setParsedLines(sortedParsedLines);
        setText(event.target.value);
    }

    return (
        <div className="App">
            <div>
                <textarea rows={5} value={text} onChange={handleChangeText}/>

                <GridComponent items={parsedLines}/>
                {/*<GridComponent items={parsedObjectArray}/>*/}

                {/*<p>Example text: {text}</p>*/}
            </div>

        </div>
    );
}

export default App;
