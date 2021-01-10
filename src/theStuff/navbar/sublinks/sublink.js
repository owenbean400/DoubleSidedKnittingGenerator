import React, { useState } from 'react';

export default function Sublink(props){
    const [hover, setHover] = useState(false);

    return(
        <li 
            onClick={props.action} 
            className={props.className}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            style={{backgroundColor: (hover) ? props.colorCss[2] : props.colorCss[1], borderColor: props.colorCss[2], color: props.colorCss[3]}}>
            {props.name}
        </li>
    )
}