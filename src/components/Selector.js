import React from 'react';
import { InputContainerStyled, SelectStyled } from '../styles/Form';
import { PageHeader3Styled } from '../styles/Main';


function Selector(props) {
    return (
        <>
            <PageHeader3Styled>{props.input.title}</PageHeader3Styled>
            <SelectStyled 
                type="text"
                id={props.name}
                name={props.name}
                value={props.input.value} 
                onChange={(e) => {
                    props.onChange(e.target.value, props.tab, props.section, props.name)
                }} 
                placeholder={props.input.placeholder} 
            >
                {
                    props.options.map((o, i) => (
                        <option key={i} value={o}>{o}</option>
                    ))
                }
            </SelectStyled>
        </>
            

    );
}



export default Selector;