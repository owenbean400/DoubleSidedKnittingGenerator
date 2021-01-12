import React, { useState } from 'react';

export default function SettingLink(){
    const [hover, setHover] = useState(false);

    return(
        <li onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
            Settings
        </li>
    )
}