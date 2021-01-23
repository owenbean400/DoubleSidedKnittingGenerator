import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';


export default function KeyTableCode(props){
    const [active, setActive] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if(active){
            document.addEventListener('keypress', keyPressed);
            document.addEventListener('click', activeClicked);
        }
        return function cleanup(){
            document.removeEventListener('keypress', keyPressed);
            document.removeEventListener('click', activeClicked);
        }
    })

    function activeClicked(){
        setActive(false);
    }
    
    function keyPressed(event){
        event.preventDefault();
        const key = event.key;
        if(!props.keysUsed.includes(key)){
            setActive(false);
            console.log("active " + props.keyName + " : " + props.keyCode + " to: " + event.key);
            dispatch({type: "CHANGE_KEY", keyCat: props.categoryKey, keySelect: props.keyName, newKey: event.key});
        }
        else{
            setActive(true);
        }
    }
    
    const STYLE = {
        items: {
            border: props.colorTheme[1] + ' 2px solid',
            padding: '8px',
            color: props.colorTheme[1],
            cursor: 'pointer'
        }
    }

    return(
        <tr onClick={() => setActive(true)}>
            <td style={STYLE.items}>
                {camelCaseToWord(props.categoryKey) + " " + camelCaseToWord(props.keyName)}
            </td>
            <td style={{backgroundColor: (active) ? "rgba(135,135,135,0.5)" : props.colorTheme[0], ...STYLE.items}}>
                {camelCaseToWord(props.keyCode)}
            </td>
        </tr>
    )
}

function upperCaseFirstLetter(string){
    let newString = "";
    newString += string.charAt(0);
    newString = newString.toUpperCase();
    newString += string.substring(1, string.length);
    return newString;
}

function camelCaseToWord(string){
    let newString = "";
    string = upperCaseFirstLetter(string);
    newString += string.charAt(0);
    for(let i = 1; i < string.length; i++){
        if(string.charAt(i).toUpperCase() === string.charAt(i)){
            newString += " ";
        }
        newString += string.charAt(i);
    }
    return newString
}
