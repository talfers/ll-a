import React, {useContext} from 'react';
import { Context as TaskContext } from '../context/TaskContext';
import { DateStyled } from '../styles/Form';
import { PageHeader3Styled } from '../styles/Main';



function Date({input, section, tab, name}) {
    const {updateValue} = useContext(TaskContext);

    return (
        <>
            <PageHeader3Styled>{input.title}</PageHeader3Styled>
            <DateStyled 
                type={input.type}
                id={name}
                name={name}
                value={input.value} 
                onChange={(e) => {
                    updateValue(e.target.value, tab, section, name)
                }} 
                placeholder={input.placeholder} 
            />
        </>
    );
}



export default Date;