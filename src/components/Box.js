import React from 'react';
import iconMap from '../data/iconMap';
import { IconContext } from "react-icons";
import { BoxContainerStyled, BoxTitleStyled, BoxIconContainerStyled } from '../styles/Home';


function Box({box, onClick, index}) {

    return (
        <IconContext.Provider value={{ style: { fontSize: '20px' } }}>
            <BoxContainerStyled $delay={index * 0.3} onClick={() => onClick(box)}>
                <BoxIconContainerStyled>{iconMap[box.name]}</BoxIconContainerStyled>
                <BoxTitleStyled>{box.name}</BoxTitleStyled>
            </BoxContainerStyled>
        </IconContext.Provider>
    );
}

export default Box;