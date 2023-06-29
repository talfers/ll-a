import React from 'react';
import { TextAreaStyled } from '../styles/Form';
import { PageHeader3Styled, PageSubTitleStyled } from '../styles/Main';



function TextArea({input, name, tab, section, onUpdate}) {


    return (
            <>
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
            </>
                 
    );
}



export default TextArea;