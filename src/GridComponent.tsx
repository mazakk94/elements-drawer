import React from "react";
import {ParsedObject} from "./App";

interface GridComponentProps {
    items: ParsedObject[];
}

export const GridComponent = ({items}: GridComponentProps) => {

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