import React, { useState } from 'react';
import SettingPage from '../../settingScreen/settings';
import NavLink from './link';

export default function SettingLink(props){
    const [hover, setHover] = useState(false);
    const [active, setActive] = useState(false);

    function openSetting(){
        setActive(true);
        setHover(false);
    }

    if(!active){
        return(
            <div onMouseEnter={() => setHover(true)} onMouseOut={() => setHover(false)} onClick={openSetting}>
                <NavLink
                    name="Settings"
                    colorCss={props.colorCss}
                    hovering={hover}
                    reactRoute={true}
                    route="/setting"
                />
            </div>
        )
    }
    else{
        return(
            <SettingPage
                removeAction={() => setActive(false)}
            />
        )
    }
}