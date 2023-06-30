import React from 'react';
import { InputStyled } from '../styles/Form';
import { CounterContainerStyled, CounterActionContainerStyled, CounterHeaderStyled, CheckboxContainerStyled } from '../styles/Counter';



function Checkbox({input, section, name, tab, onChange}) {

    return (
        <CounterContainerStyled>
            <CounterHeaderStyled>{name.charAt(0).toUpperCase()+name.slice(1).replaceAll('_', ' ')}</CounterHeaderStyled>
            <CounterActionContainerStyled>
                <CheckboxContainerStyled>
                    <InputStyled 
                        type="checkbox"
                        id={name}
                        name={name}
                        checked={input.value} 
                        onChange={(e) => {
                            onChange(!input.value, tab, section, name)
                        }} 
                    />
                </CheckboxContainerStyled>
                
            </CounterActionContainerStyled>
        </CounterContainerStyled>
    );
}



export default Checkbox;