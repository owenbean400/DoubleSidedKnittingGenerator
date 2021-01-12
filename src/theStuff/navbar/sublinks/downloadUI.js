import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import createKnitImg from '../../downloads/printFunctions/knitChartBlackAndWhite';
import knitChartPreview from '../../downloads/printFunctions/knitChartPreview';
import pdfCreatorKnit from '../../downloads/printFunctions/knitInstructionPDF';
import download from 'downloadjs';
import Sublink from './sublink';

export default function DownloadNav(props){
    const [hover, setHover] = useState(false);
    const state = useSelector(state => state.info);
    const info = {
        grid: state.grid.row,
        color: state.color
    }
    const subLinks = {
        Download_Knit_Chart: () => download(createKnitImg(info)),
        Download_Knit_Preview: () => download(knitChartPreview(info)),
        Download_Knit_Instruction: () => pdfCreatorKnit(info)
    }
    const subLinksJSX = createSubLinks(subLinks, props.colorCss);

    return(
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div className="links" style={{backgroundColor: (hover) ? props.colorCss[2] : props.colorCss[0], color: props.colorCss[3], borderColor: props.colorCss[1]}}>
                Downloads
            </div>
            <ol style={{display: (hover) ? 'block' : 'none'}} className="sub-link-container">
                {subLinksJSX}
            </ol>
        </div>
    )
}

function createSubLinks(links, colorCss){
    let JSXArray = [];
    for(let i = 0; i < Object.keys(links).length; i++){
        let name = "";
        for(let j = 0; j < Object.keys(links)[i].length; j++){
            if(Object.keys(links)[i].charAt(j) === "_"){
                name += " ";
            }
            else{
                name += Object.keys(links)[i].charAt(j);
            }
        }
        JSXArray.push(
            <Sublink
                action={Object.values(links)[i]}
                className="sub-link"
                colorCss={colorCss}
                name={name}
            />
        )
    }
    return JSXArray;
}