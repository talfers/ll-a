import React, { useContext } from 'react';
import { BoxesContainerStyled } from '../styles/Home';
import { ContainerStyled, PageHeaderStyled, PageSubTitleStyled } from '../styles/Main';
import Box from './Box';
import { useNavigate } from 'react-router-dom';
import { Context as TaskContext } from '../context/TaskContext';

function Home({tabs, setActiveTab}) {
    const navigate = useNavigate();
    const { resetStep } = useContext(TaskContext)

    const handleBoxClick = (item) => {
        resetStep(item.id)
        setActiveTab(item.id)
        navigate('/assistant');
    }

    const createBoxes = () => {
        
        return tabs.map((b, i) => (
            <Box key={i} onClick={handleBoxClick} box={b} index={i}/>
        ))
    }
    return (
        <ContainerStyled>
            <PageHeaderStyled>Create New</PageHeaderStyled>
            <PageSubTitleStyled>Select content for assistant to generate</PageSubTitleStyled>
            <BoxesContainerStyled>
                {createBoxes()}
            </BoxesContainerStyled>
        </ContainerStyled>
    );
}

export default Home;