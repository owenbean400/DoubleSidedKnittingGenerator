import './toolbar.sass'
import React, { useState } from 'react'
import ColorPicker from './colorPicker'
import ZoomPicker from './zoomPicker'
import SizePicker from './sizePicker'
import RandomizePicker from './randomize'
import { useSelector } from 'react-redux'
import Tool from './tool'

export default function Toolbar(){
    const [tool, setTool] = useState("none");
    const darkMode = useSelector(state => state.customize.darkMode);
    const tools = ["color", "size", "zoom", "random"];
    let colorCss;
    if(darkMode){
        colorCss = ["#444", "#212121", "white"];
    }
    else{
        colorCss = ["#fff", "#eee", "black"];
    }

    function renderTool(tool) {
        console.log("clicked tool");
        switch(tool){
            case "color":
                return <ColorPicker
                        colorCss={colorCss}
                        />;
            case "zoom":
                return <ZoomPicker
                        colorCss={colorCss}
                        />;
            case "size":
                return <SizePicker
                        colorCss={colorCss}
                        />;
            case "random":
                return <RandomizePicker
                        colorCss={colorCss}
                        />;
            default:
                return null;
        }
    }

    const toolsJSX = tools.map(toolName => {
        return(
            <Tool
                name={toolName.substring(0, 1).toUpperCase() + toolName.substring(1, toolName.length)}
                open={() => setTool(toolName)}
                colorCss={colorCss}
            />
        )
    })

    return(
        <div onMouseLeave={() => setTool("none")} className="no-print">
            <div className="toolbar-container" style={{backgroundColor: colorCss[0], color: colorCss[2]}}>
                <ol className="tools-container">
                    {toolsJSX}
                </ol>
            </div>
            {renderTool(tool)}
        </div>
    )
}