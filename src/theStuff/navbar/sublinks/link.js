import React from 'react';

export default function NavLink(props){
    return(
        <div className="links" style={{backgroundColor: (props.hovering) ? props.colorCss[2] : props.colorCss[0], color: props.colorCss[3], borderColor: props.colorCss[1]}}>
            {props.name}
        </div>
    )
}