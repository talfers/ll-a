import React from 'react';
import iconMap from '../data/iconMap';
import { BoxIconContainerStyled } from '../styles/Home';
import { ClusterContainerStyled, ClusterItemContainerStyled, ClusterItemTitleStyled, ClusterSectionContainerStyled, ClusterSectionsContainerStyled } from '../styles/Cluster';
import { IconContext } from 'react-icons';
import { PageHeader3Styled, SpacerStyled } from '../styles/Main';

function Cluster({name, input, tab, section, onUpdate}) {

    const onSelection = (e, key, id) => {
        let tempSelected = {...input.value};
        tempSelected[key][id] = !tempSelected[key][id];
        onUpdate(tempSelected, tab, section, name)
    }

    const createBoxes = () => {
        return Object.keys(input.value).map((h, i) => (
            <ClusterSectionContainerStyled>
                <h4>{h.charAt(0).toUpperCase()+h.slice(1)}</h4>
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
        <ClusterSectionsContainerStyled>
            <PageHeader3Styled>Select all that apply:</PageHeader3Styled>
            <SpacerStyled/>
            <>
                {createBoxes()}
            </>
        </ClusterSectionsContainerStyled>
        
        
    );
}



export default Cluster;