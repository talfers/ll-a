import styled from 'styled-components';
import { devices } from "../data/constants";

export const ClusterContainerStyled = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 12px;
    @media only screen and ${devices.md} {
    }
`;

export const ClusterItemContainerStyled = styled.div`
    padding: 20px;
    margin: 12px 24px 12px 0px;
    border-radius: 16px;
    width: calc(20% - 24px);
    min-width: 200px;
    max-width: 240px;
    height: 120px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    cursor: pointer;
    border: ${props => props.$selected?`1.5px black solid`:`1px solid ${props.theme.colors.borderColor}`};
    background: ${props => props.$selected?props.theme.colors.opacityColor:'inherit'};
    transition: background 0s, transform 0.2s ease-out, border 0.1s ease-in;
    color: ${({ theme }) => theme.colors.contrastText};
    &:hover {
        border: 1.75px black solid;
        background: ${props => props.$selected?props.theme.colors.opacityColor:'transparent'};

    }
    &:active {
        transform: scale(0.95);
    }
    @media only screen and ${devices.md} {
        width: 40%; 
        min-width: 110px;
        margin: 6px 12px 6px 0px;

        &:hover {
            border: ${props => props.$selected?`1.5px black solid`:`1px solid ${props.theme.colors.borderColor}`};
            background: ${props => props.$selected?props.theme.colors.opacityColor:'inherit'};
        }
    }
`;

export const ClusterItemTitleStyled = styled.h3`
    font-size: 16px;
    font-weight: 400;
`;
