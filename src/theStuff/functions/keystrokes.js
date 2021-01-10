import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function KeyStroke(){
    let keysPressed = {};

    useEffect(() => {
        document.addEventListener("keydown" , keyDown)
        document.addEventListener("keyup", (event) => {
            delete keysPressed[event.key];
        })
    })
    const keyBoardShortcuts = useSelector(state => state.customize.shortcutKeys);

    const dispatch = useDispatch();

    function keyDown(event){
        keysPressed[event.key] = true;
        if(keysPressed[keyBoardShortcuts.zoom.key]){
            if(event.key === keyBoardShortcuts.zoom.keyIn)
                dispatch({type: "CHANGE_SIZE", size: '+'})
            else if(event.key === keyBoardShortcuts.zoom.keyOut)
                dispatch({type: "CHANGE_SIZE", size: '-'})
        }
        if(keysPressed[keyBoardShortcuts.size.key]){
            switch(event.key){
                case keyBoardShortcuts.size.rowMinus:
                    dispatch({type: "CHANGE_GRID", gridInfo: "row-"});
                    break;
                case keyBoardShortcuts.size.rowPlus:
                    dispatch({type: "CHANGE_GRID", gridInfo: "row+"});
                    break;
                case keyBoardShortcuts.size.columnPlus:
                    dispatch({type: "CHANGE_GRID", gridInfo: "column+"});
                    break;
                case keyBoardShortcuts.size.columnMinus:
                    dispatch({type: "CHANGE_GRID", gridInfo: "column-"});
                    break;
            }
        }
        if(event.key === keyBoardShortcuts.random.key)
            dispatch({type: "RANDOM_GRID"});
        if(event.key === keyBoardShortcuts.switchDarkmode.key){
            dispatch({type: "SWITCH_DARKMODE"});
        }
    }

    return(
        <div>
        </div>
    )
}