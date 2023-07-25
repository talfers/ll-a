import React, { useState } from 'react';
import { InfoBubbleStyled, InfoBubbleTextContainerStyled, InfoBubbleTextStyled, InfoIconStyled } from '../styles/Main';
import iconMap from '../data/iconMap';
import { IconContext } from "react-icons";

function InfoBubble({info}) {
    const [displayed, setDisplayed] = useState(false);

    return (
        <InfoBubbleStyled>
            <IconContext.Provider value={{ style: { fontSize: '24px' } }}>
                <InfoIconStyled onClick={() => setDisplayed(!displayed)}>{displayed?iconMap['X']:iconMap['Info']}</InfoIconStyled>
            </IconContext.Provider>
            <InfoBubbleTextContainerStyled $displayed={displayed}>
                <InfoBubbleTextStyled>{info}</InfoBubbleTextStyled>
            </InfoBubbleTextContainerStyled>
        </InfoBubbleStyled>
    );
}


export default InfoBubble;