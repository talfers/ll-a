import React from 'react';
import { CounterContainerStyled, CounterActionContainerStyled, CounterHeaderStyled } from '../styles/Counter';
import { CheckboxContainerStyled, CheckboxStyled } from '../styles/Checkbox';



function Checkbox({input, section, name, tab, onChange}) {

    return (
        <CounterContainerStyled>
            <CounterHeaderStyled>{input.title}</CounterHeaderStyled>
            <CounterActionContainerStyled>
                <CheckboxContainerStyled>
                    <CheckboxStyled 
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