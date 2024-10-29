import React, {useEffect} from "react";
import {ParsedObject} from "./App";

interface GridComponentProps {
    items: ParsedObject[];
}

export const GridComponent = ({items}: GridComponentProps) => {

    useEffect(() => {
        console.log('Component created (mounted)');
        return () => {
            console.log('Component destroyed (unmounted)');
        };
    }, []);

    const maxColumn = Math.max(...items.map(item => item.column));
    const maxLine = Math.max(...items.map(item => item.line));

    const gridElement = (index: any, element: ParsedObject) => {
        const style = {
            gridRow: element.line,
            gridColumn: element.column,
        };

        return (
            <div className="grid-item" key={index} style={style}>
                <p>{element.label}</p>
                {printElement(element)}
            </div>
        );
    }

    const printElement = (element: any) => {
        return <>
            {element.type === 'TEXT_INPUT' ?
                printTextInput(element) :
                printSelectOptions(element)}
        </>;
    }

    const printSelectOptions = (element: ParsedObject) => {
        return <select>
            {element.value.split(',').map((option: any, index: any) => {
                return (<option key={index}>{option}</option>)
            })}
        </select>;
    }

    const printTextInput = (element: ParsedObject) => {
        return <input placeholder={element.value}/>;
    }

    const isValid = (element: any) => {
        return !(element.value === "" || element.type === "" || element.label === "");
    }

    return (
        <div
            className="grid-container"
            style={{
                gridTemplateColumns: `repeat(${maxColumn}, 1fr)`,
                gridTemplateRows: `repeat(${maxLine}, auto)`,
            }}
        >
            {items.map((element: any, index: any) => {
                return isValid(element) ? gridElement(index, element) : null;
            })}
        </div>
    );
}