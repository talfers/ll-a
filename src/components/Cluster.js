import React from 'react';
import iconMap from '../data/iconMap';
import { BoxIconContainerStyled } from '../styles/Home';
import { ClusterContainerStyled, ClusterItemContainerStyled, ClusterItemTitleStyled, ClusterSectionContainerStyled } from '../styles/Cluster';
import { IconContext } from 'react-icons';
import { PageHeader3Styled } from '../styles/Main';

function Cluster({name, input, tab, section, onUpdate}) {

    const onSelection = (e, key, id) => {
        let tempSelected = {...input.value};
        tempSelected[key][id] = !tempSelected[key][id];
        onUpdate(tempSelected, tab, section, name)
    }

    // const createBoxes = () => {
    //     return Object.keys(input.value).map(key => (
    //         <IconContext.Provider key={key} value={{ style: { fontSize: '20px' } }}>
    //             <ClusterItemContainerStyled key={key} $selected={input.value[key]} onClick={(e) => onSelection(e, key)}>
    //                 <BoxIconContainerStyled>{iconMap[key]}</BoxIconContainerStyled>
    //                 <ClusterItemTitleStyled>{key.charAt(0).toUpperCase()+key.slice(1).replaceAll('_', ' ')}</ClusterItemTitleStyled>
    //             </ClusterItemContainerStyled>
    //         </IconContext.Provider>
    //     ))
    // }

    const createBoxes = () => {
        return Object.keys(input.value).map((h, i) => (
            <ClusterSectionContainerStyled>
                <h4>{h}</h4>
                <ClusterContainerStyled>
                {
                    Object.keys(input.value[h]).map(key => (
                        <IconContext.Provider key={key} value={{ style: { fontSize: '20px' } }}>
                            <ClusterItemContainerStyled key={key} $selected={input.value[h][key]} onClick={(e) => onSelection(e, h, key)}>
                                <BoxIconContainerStyled>{iconMap[key]}</BoxIconContainerStyled>
                                <ClusterItemTitleStyled>{key.charAt(0).toUpperCase()+key.slice(1).replaceAll('_', ' ')}</ClusterItemTitleStyled>
                            </ClusterItemContainerStyled>
                        </IconContext.Provider>
                    ))
                }
                </ClusterContainerStyled>
                
            </ClusterSectionContainerStyled>
        ))
    }
    
    return (
        <>
            <PageHeader3Styled>Select all that apply:</PageHeader3Styled>
            <>
                {createBoxes()}
            </>
        </>
        
        
    );
}



export default Cluster;