import React from 'react';
import { useSelector } from 'react-redux';
import KeyTableCode from './keyTable';

export default function KeySetting(props){
    const keyBoardShortcutRedux = useSelector(state => state.customize.shortcutKeys);

    const keyBoardJSX = getKeysArrayJSX(keyBoardShortcutRedux, props.colorTheme);

    return(
        <table style={STYLE.table}>
            <h2>Keyboard Shortcuts</h2>
            <tbody>
                {keyBoardJSX}
            </tbody>
        </table>
    )
}

const STYLE = {
    table: {
        width: '90%',
        margin: '0 auto 32px auto',
        borderCollapse: 'collapse',
    },
    header: {
        fontSize: '24px',
        fontWeight: '400',
        margin: '18px 0 6px 0'
    }
}

function getKeysArrayJSX(keyBoardShortcuts, colorTheme){
    var keyTable = [];
    var alreadyKeyUse = [];

    for(let i = 0; i < Object.keys(keyBoardShortcuts).length; i++){
        for(let j = 0; j < Object.keys(keyBoardShortcuts[Object.keys(keyBoardShortcuts)[i]]).length; j++){
            alreadyKeyUse.push(Object.values(keyBoardShortcuts[Object.keys(keyBoardShortcuts)[i]])[j]);
        }
    }
    for(let i = 0; i < Object.keys(keyBoardShortcuts).length; i++){
        keyTable.push(
            <tr><td><h2 style={STYLE.header}>{upperCaseFirstLetter(Object.keys(keyBoardShortcuts)[i])}</h2></td></tr>
        )
        for(let j = 0; j < Object.keys(keyBoardShortcuts[Object.keys(keyBoardShortcuts)[i]]).length; j++){
            keyTable.push(
                <KeyTableCode
                    categoryKey={Object.keys(keyBoardShortcuts)[i]}
                    keyName={Object.keys(keyBoardShortcuts[Object.keys(keyBoardShortcuts)[i]])[j]}
                    keyCode={Object.values(keyBoardShortcuts[Object.keys(keyBoardShortcuts)[i]])[j]}
                    keysUsed={alreadyKeyUse}
                    colorTheme={colorTheme}
                />
            );
        }
    }
    return keyTable;
}

function upperCaseFirstLetter(string){
    let newString = "";
    newString += string.charAt(0);
    newString = newString.toUpperCase();
    newString += string.substring(1, string.length);
    return newString;
}