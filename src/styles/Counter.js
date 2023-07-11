import styled from 'styled-components';


export const CounterContainerStyled = styled.div`
    display: flex;
    align-items: center;
    min-height: 80px;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid ${({theme}) => theme.colors.borderColor};
`;

export const CheckboxWrapperContainerStyled = styled(CounterContainerStyled)`
    background: ${({theme}) => theme.colors.borderColor};
    border: 1px solid ${({theme}) => theme.colors.borderColor};
`;

export const CounterActionContainerStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 120px;
`;

export const CounterButtonStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${({ theme }) => theme.colors.subTextColor};
    color: ${({ theme }) => theme.colors.subTextColor};
    opacity: ${(props) => props.$disabled?0.5:1};
    font-size: 24px;
    border-radius: 100%;
    height: 30px;
    width: 30px;
    margin: 0px 6px;
    cursor: pointer;
    z-index: 0;
    pointer-events: ${(props) => props.$disabled?'none':""};
    &:hover {
        border: 1px solid ${({ theme }) => theme.colors.contrastText};
        color: ${({ theme }) => theme.colors.contrastText};
    }
`;

export const CounterValueStyled = styled.input`
    border: none;
    width: 40px;
    text-align: center;
    font-size: 18px;
    &:focus {
        outline: none !important;
        border: none;
    }
`;

export const CounterHeaderStyled = styled.div`
    font-size: 18px;
    font-weight: 500;
    color:  ${({ theme }) => theme.colors.contrastText};

`;

export const CheckboxContainerStyled = styled.div`
    width: 60px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;    
`;