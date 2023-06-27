import React from 'react';
import { InputContainerStyled, TextAreaStyled } from '../styles/Form';
import { PageHeader3Styled, PageSubTitleStyled } from '../styles/Main';



function TextArea({input, name, tab, section, onUpdate}) {


    return (
            <InputContainerStyled
            key={input.name} 
            $type={input.type}
            $size={input.size}
            >
                <PageHeader3Styled>{input.title}</PageHeader3Styled>
                <PageSubTitleStyled>{input.subtext}</PageSubTitleStyled>
                <TextAreaStyled 
                    type={input.type} 
                    id={name} 
                    name={name}
                    value={input.value} 
                    onChange={(e) => {
                        onUpdate(e.target.value, tab, section, name)
                    }} 
                    placeholder={input.placeholder} 
                />
            </InputContainerStyled>
                 
    );
}



export default TextArea;