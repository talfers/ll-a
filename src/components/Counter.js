import React, {useState} from 'react';
import { CounterContainerStyled, CounterActionContainerStyled, CounterHeaderStyled, CounterButtonStyled, CounterValueStyled } from '../styles/Counter';
import iconMap from '../data/iconMap';
import { IconContext } from "react-icons";

function Counter({name, input, tab, section, onUpdate, step}) {
    const [decrementDisabled, setDecrementDisabled] = useState(input.value===0?1:0);
    const increment = () => {
        if(decrementDisabled===1){setDecrementDisabled(0)}
        onUpdate(Number(input.value) + Number(step), tab, section, name)
    }

    const decrement = () => {
        if (Number(input.value) - Number(step) <= 0) {
            setDecrementDisabled(1)
            onUpdate(0, tab, section, name)
        } 
        else {
            if(decrementDisabled===1){setDecrementDisabled(0)}
            onUpdate(Number(input.value) - Number(step), tab, section, name)
        }
    }

    const checkDisabled = () => {
        if (Number(input.value) === 0) {
            setDecrementDisabled(1)
            onUpdate(0, tab, section, name)
        } 
        else {
            if(decrementDisabled===1){setDecrementDisabled(0)}
            onUpdate(Number(input.value), tab, section, name)
        }
    }

    return (
        <CounterContainerStyled>
            <IconContext.Provider value={{ style: { fontSize: '12px' } }}>
                <CounterHeaderStyled>{input.title}</CounterHeaderStyled>
                <CounterActionContainerStyled>
                    <CounterButtonStyled $disabled={decrementDisabled===1} onClick={decrement}>{iconMap['Minus']}</CounterButtonStyled>
                    <CounterValueStyled 
                        $step={step} 
                        type="text" 
                        value={Number(input.value)?Number(input.value):0} 
                        onChange={(e) => {
                            onUpdate(e.target.value, tab, section, name)
                        }}
                        onFocus={ checkDisabled } 
                        onBlur={ checkDisabled }
                    />
                    <CounterButtonStyled onClick={increment}>{iconMap['Plus']}</CounterButtonStyled>
                </CounterActionContainerStyled>
            </IconContext.Provider>
            
            
        </CounterContainerStyled>
    );
}



export default Counter;