import styled from 'styled-components';
import { InputStyled } from './Form';
import { CounterContainerStyled } from './Counter';


export const CheckboxContainerStyled = styled.div`
    width: 60px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;  
    position: relative; 
`;

export const CheckboxWrapperContainerStyled = styled(CounterContainerStyled)`
    background: ${({theme}) => theme.colors.borderColor};
    border: 1px solid ${({theme}) => theme.colors.borderColor};
`;

export const CheckboxStyled = styled(InputStyled)`
    accent-color: ${({theme}) => theme.colors.activeColor};
    margin-top: 0px;
`;

