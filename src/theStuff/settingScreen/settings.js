import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CloseButton from '../UIs/closeButton';
import KeySetting from './keySetting';
import ColorCanvasSetting from './colorCanvasSetting';
import ScrollArea from 'react-scrollbar';

export default function SettingPage(props){
    const isDarkMode = useSelector(state => state.customize.darkMode);
    const TABS = ["key", "color"];
    const [tab, setTab] = useState("key");
    let colorTheme;
    if(isDarkMode){
        colorTheme = ["#333", "#ccc"];
    } 
    else {
        colorTheme = ["#eee", "black"];
    }

    const tabHTML = tabJSX(tab, colorTheme);

    const TABS_JSX = TABS.map((string) => {
        return(
            <Tab action={() => setTab(string)} string={string} active={string === tab} key={string + " TAB"}/>
        )
    })

    return(
        <div style={{...STYLE.container, backgroundColor: colorTheme[0], color: colorTheme[1]}}>
            <CloseButton 
                clickAction={props.removeAction}
                size={48}
                thickness={4}
                color={colorTheme[1]}
                styleContainer={{
                    position: 'fixed',
                    top: '16px',
                    right: '16px',
                }}
            />
            <ol style={STYLE.tabContainer}>
                {TABS_JSX}
            </ol>
            <ScrollArea
                style={STYLE.windowContainer}
                smoothScrolling={true}
            >
                {tabHTML}
            </ScrollArea>
        </div>
    )
}

const STYLE = {
    container: {
        width: '100vw',
        height: '100vh',
        zIndex: '9000',
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'auto',
        padding: 0
    },
    colorChange: {
        width: '50%',
        margin: '0 auto 32px auto',
    },
    tabContainer: {
        padding: 0,
        width: '100%',
        listStyleType: 'none',
        display: 'flex',
        flexWrap: 'wrap'
    },
    windowContainer: {
        width: "80%",
        margin: "64px auto 16px auto",
        height: "calc(100% - 128px)"
    }
}

function Tab(props) {
    const TAB_STYLE = {
        backgroundColor: (props.active) ? "rgba(135, 135, 135, 0.2)": "rgba(135, 135, 135, 0)",
        padding: '12px',
        cursor: (!props.active) ? 'pointer' : 'default',
    }

    return(
        <li onClick={props.action} style={TAB_STYLE}>{props.string}</li>
    )
}

function tabJSX(tabSwitch, colorTheme) {
    switch(tabSwitch) {
        case "key":
            return <KeySetting colorTheme={colorTheme} />
        case "color":
            return <ColorCanvasSetting colorTheme={colorTheme}/>
        default:
            return <div>nothing</div>
    }
}