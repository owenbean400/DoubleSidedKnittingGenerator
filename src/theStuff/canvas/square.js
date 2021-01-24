import React from 'react';
import { useSelector } from "react-redux";

export default function Square(props) {
    const speedDrawing = useSelector(state => state.speedDrawing);

    let STYLE = {
        box: {
            margin: '1px',
            width: props.size * 12 + "px",
            height: props.size * 9 + "px",
            transition: 'width 0.2s, height 0.2s',
            backgroundColor: props.color
        }
    }

    const gridData = "Row: " + props.row + " Column: " + props.column

    return(
        <div style={STYLE.box} onMouseOver={() => {if(speedDrawing){props.changeColorAction(gridData)}}} onClick={() => props.changeColorAction(gridData)}>
        </div>
    )
}