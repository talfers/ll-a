import styled from 'styled-components';
import { devices } from "../data/constants";


export const ProfileContentContainerStyled = styled.div`
    text-align: left;
    margin-bottom: 20px;
`;

export const ProfileHeaderContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
`;

export const ProfileTextStyled = styled.div`
    @media only screen and ${devices.md} {
        width: 80%;
    }
`;