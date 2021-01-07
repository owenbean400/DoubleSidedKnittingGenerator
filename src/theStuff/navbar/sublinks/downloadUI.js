import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import createKnitImg from '../../downloads/printFunctions/knitChartBlackAndWhite';
import knitChartPreview from '../../downloads/printFunctions/knitChartPreview';
import pdfCreatorKnit from '../../downloads/printFunctions/knitInstructionPDF';
import download from 'downloadjs';

export default function DownloadNav(){
    const [hover, setHover] = useState(false);
    const state = useSelector(state => state.info);
    const info = {
        grid: state.grid.row,
        color: state.color
    }

    return(
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div className="links">
                Downloads
            </div>
            <ol style={{display: (hover) ? 'block' : 'none',}} className="sub-link-container">
                <li onClick={() => download(createKnitImg(info))} className="sub-link">Download Knit Chart</li>
                <li onClick={() => download(knitChartPreview(info))} className="sub-link">Download Knit Preview</li>
                <li onClick={() => pdfCreatorKnit(info)} className="sub-link">Download Knit Instruction</li>
            </ol>
        </div>
    )
}