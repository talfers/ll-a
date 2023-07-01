import React from 'react';
import iconMap from '../data/iconMap';
import { BoxIconContainerStyled } from '../styles/Home';
import { ClusterContainerStyled, ClusterItemContainerStyled, ClusterItemTitleStyled } from '../styles/Cluster';
import { IconContext } from 'react-icons';
import { PageHeader3Styled } from '../styles/Main';

function Cluster({name, input, tab, section, onUpdate}) {
    // const [selected, setSelected] = useState(input.value)

    const onSelection = (e, id) => {
        let tempSelected = {...input.value};
        tempSelected[id] = !tempSelected[id];
        onUpdate(tempSelected, tab, section, name)
    }

    const createBoxes = () => {
        return Object.keys(input.value).map((key) => (
            <IconContext.Provider key={key} value={{ style: { fontSize: '20px' } }}>
                <ClusterItemContainerStyled key={key} $selected={input.value[key]} onClick={(e) => onSelection(e, key)}>
                    <BoxIconContainerStyled>{iconMap[key]}</BoxIconContainerStyled>
                    <ClusterItemTitleStyled>{key.charAt(0).toUpperCase()+key.slice(1).replaceAll('_', ' ')}</ClusterItemTitleStyled>
                </ClusterItemContainerStyled>
            </IconContext.Provider>
        ))
    }
    
    return (
        <>
            <PageHeader3Styled>Select all that apply:</PageHeader3Styled>
            <ClusterContainerStyled>
                {createBoxes()}
            </ClusterContainerStyled>
        </>
        
        
    );
}



export default Cluster;