import React from 'react';
import { CompactPicker } from 'react-color';
import { useSelector, useDispatch } from 'react-redux';

export default function ColorCanvasSetting(props) {
    const canvasColor = useSelector(state => state.customize.canvasColor);
    const dispatch = useDispatch();

    let changeColor = (color) => {
        dispatch({type: "CHANGE_CANVAS_COLOR", color: color.hex});
    }

    return(
        <div style={{backgroundColor: canvasColor, color: props.colorTheme[0], WebkitTextStroke: "0.2px " + props.colorTheme[1], ...STYLE.container}}>
            <h2 style={STYLE.headerText}>Canvas Color</h2>
            <h4 style={STYLE.subHeaderText}>Color:  {canvasColor}</h4>
            <div style={{...STYLE.colorpickerContainer, backgroundColor: canvasColor}}>
                <CompactPicker
                    onChangeComplete={changeColor}
                    color={canvasColor}
                />
            </div>
        </div>
    )        
}

const STYLE = {
    colorpickerContainer: {
        width: '50%'
    },
    headerText: {
        fontSize: '32px',
        margin: 0,
    },
    subHeaderText: {
        fontSize: '24px',
        margin: "12px 0 8px 0",
    },
    container: {
        padding: "16px",
    }
}