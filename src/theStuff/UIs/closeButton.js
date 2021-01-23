import React from 'react';

export default function CloseButton(props){

    let style = {
        close: {
            width: props.size + 'px',
            height: props.size + 'px',
            margin: 0,
            borderRadius: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: (props.isBordered) ? props.color + " 1px solid" : "none",
        },
        bar: {
            width: props.size + 'px',
            height: props.thickness + 'px',
            borderRadius: props.thickness + 'px',
            display: 'block',
            backgroundColor: props.color
        }
    }

    return(
        <div onClick={props.clickAction} style={{...style.close, ...props.styleContainer}}>
            <div style={{...style.bar, transform: "translateX(" + (props.size / 4) + "px) rotate(45deg)"}}></div>
            <div style={{...style.bar, transform: "translateX(" + (-1 * (props.size / 4)) + "px) rotate(-45deg)"}}></div>
        </div>
    )
}