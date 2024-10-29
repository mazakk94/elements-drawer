import React, {useState} from 'react';
import './App.css';
import LineParser from "./LineParser";
import {GridComponent} from "./GridComponent";

export class ParsedObject {
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

function App() {

    const [parsedLines, setParsedLines] = useState([new ParsedObject("", "", "", 0, 0)]);

    const updateParsedLines = (event: any) => {
        var lines = event.target.value.split('\n');
        var sortedParsedLines = LineParser.parseLines(lines)
        setParsedLines(sortedParsedLines);
    }

    return (
        <div className="App">
            <div>
                <textarea rows={5} cols={50} onChange={updateParsedLines}/>
                <GridComponent items={parsedLines}/>
            </div>
        </div>
    );
}

export default App;
