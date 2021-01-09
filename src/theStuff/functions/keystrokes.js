import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';

export default function KeyStroke(){
    let keysPressed = {};

    useEffect(() => {
        document.addEventListener("keydown" , keyDown)
        document.addEventListener("keyup", (event) => {
            delete keysPressed[event.key];
        })
    })

    const dispatch = useDispatch();

    function keyDown(event){
        keysPressed[event.key] = true;
        if(keysPressed["Alt"]){
            if(event.key === "ArrowUp")
                dispatch({type: "CHANGE_SIZE", size: '+'})
            else if(event.key === "ArrowDown")
                dispatch({type: "CHANGE_SIZE", size: '-'})
        }
        if(keysPressed["Control"]){
            switch(event.key){
                case "ArrowUp":
                    dispatch({type: "CHANGE_GRID", gridInfo: "row-"});
                    break;
                case "ArrowDown":
                    dispatch({type: "CHANGE_GRID", gridInfo: "row+"});
                    break;
                case "ArrowRight":
                    dispatch({type: "CHANGE_GRID", gridInfo: "column+"});
                    break;
                case "ArrowLeft":
                    dispatch({type: "CHANGE_GRID", gridInfo: "column-"});
                    break;
            }
        }
        if(event.key === "r")
            dispatch({type: "RANDOM_GRID"});
    }

    return(
        <div>
        </div>
    )
}