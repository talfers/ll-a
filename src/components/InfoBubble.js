import React, { useState } from 'react';
import { InfoBubbleStyled, InfoBubbleTextContainerStyled, InfoBubbleTextStyled, InfoIconStyled } from '../styles/Main';
import iconMap from '../data/iconMap';

function InfoBubble({info}) {
    const [displayed, setDisplayed] = useState(false);

    return (
        <InfoBubbleStyled>
            <InfoIconStyled onClick={() => setDisplayed(!displayed)}>{displayed?iconMap['X']:iconMap['Info']}</InfoIconStyled>
            <InfoBubbleTextContainerStyled $displayed={displayed}>
                <InfoBubbleTextStyled>{info}</InfoBubbleTextStyled>
            </InfoBubbleTextContainerStyled>
        </InfoBubbleStyled>
    );
}


export default InfoBubble;