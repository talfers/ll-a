import React from 'react';
import { InputStyled } from '../styles/Form';
import { PageHeader3Styled } from '../styles/Main';



function ShortTextInput({input, name, tab, section, onUpdate}) {

    return (
            <>
                <PageHeader3Styled>{input.title}</PageHeader3Styled>
                <InputStyled 
                    type={'text'} 
                    id={name} 
                    name={name}
                    value={input.value} 
                    onChange={(e) => {
                        onUpdate(e.target.value, tab, section, name)
                    }} 
                    placeholder={input.placeholder} 
                />
            </>
                 
    );
}



export default ShortTextInput;