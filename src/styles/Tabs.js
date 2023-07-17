import styled from 'styled-components';
import { devices } from "../data/constants";

export const TabsContainerStyled = styled.div`
    width: 50%;
    max-width: 1200px;
    margin: 0px auto;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.cardBG};
    min-height: 400px;
    @media only screen and ${devices.xxl} {
        max-width: 2000px;
    }
    @media only screen and ${devices.md} {
        width: 85%;
        margin: 0px auto;
    }
`;

export const TabContentContainerStyled = styled.div`
    padding: 20px;
    color: ${({ theme }) => theme.colors.paragraph};
    font-family: inherit;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.4;
   
`;
