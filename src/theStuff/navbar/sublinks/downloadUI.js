import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import createKnitImg from '../../downloads/printFunctions/knitChartBlackAndWhite';
import knitChartPreview from '../../downloads/printFunctions/knitChartPreview';
import pdfCreatorKnit from '../../downloads/printFunctions/knitInstructionPDF';
import download from 'downloadjs';
import Sublink from './sublink';
import NavLink from './link';

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
            <NavLink
                name="Downloads"
                colorCss={props.colorCss}
                hovering={hover}
            />
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