import React, { useState } from 'react'

export default function Tool(props){
    const [hovering, setHover] = useState(false);

    const backgroundColor = (hovering) ? props.colorCss[1] : props.colorCss[0];

    return(
        <li className="tools" onClick={props.open} style={{backgroundColor: backgroundColor, borderColor: props.colorCss[1]}} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
            {props.name}
        </li>
    )
}