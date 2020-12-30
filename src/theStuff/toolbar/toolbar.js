import './toolbar.sass'
import React, { useState } from 'react'
import ColorPicker from './colorPicker'
import ZoomPicker from './zoomPicker'
import SizePicker from './sizePicker';

export default function Toolbar(){
    const [tool, setTool] = useState("none");

    function renderTool(tool) {
        switch(tool){
            case "color":
                return <ColorPicker />;
            case "zoom":
                return <ZoomPicker />;
            case "size":
                return <SizePicker />;
            default:
                return null;
        }
    }

    return(
        <div onMouseLeave={() => setTool("none")} className="no-print">
            <div className="toolbar-container">
                <ol className="tools-container">
                    <li className="tools" onClick={() => setTool("color")}>
                        Color
                    </li>
                    <li className="tools" onClick={() => setTool("size")}>
                        Size
                    </li>
                    <li className="tools" onClick={() => setTool("zoom")}>
                        Zoom
                    </li>
                </ol>
            </div>
            {renderTool(tool)}
        </div>
    )
}