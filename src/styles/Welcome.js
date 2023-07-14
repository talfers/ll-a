import styled from 'styled-components';
import { devices } from "../data/constants";
import { PrimaryButtonStyled } from './Button';
import { ContentHeaderStyled, PageHeader2Styled, popUp } from './Main';

export const WelcomeSectionStyled = styled.section`
    width: 85%;
    display: flex;
    flex-direction: column;
    margin: 0px auto;
    align-items: center;
    position: relative;
`;

export const WelcomeHeaderStyled = styled(ContentHeaderStyled)`
    text-align: center;
`;

export const FeaturesContainerStyled = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0px;
    @media only screen and ${devices.md} {
        justify-content: center;
    }
`;

export const FeatureContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 20%;
    min-width: 240px;
    opacity: 0;
    margin: 0px 2.5%;
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    border-radius: 12px;
    padding: 24px;
    animation: 1s ${popUp} forwards ${(props) => props.$delay?`${props.$delay}s`: '0s'};
    -webkit-animation: 1s ${popUp} forwards ${(props) => props.$delay?`${props.$delay}s`: '0s'};
    -ms-animation: 1s ${popUp} forwards ${(props) => props.$delay?`${props.$delay}s`: '0s'};
    -moz-animation: 1s ${popUp} forwards ${(props) => props.$delay?`${props.$delay}s`: '0s'};
    @media only screen and ${devices.md} {
        margin-top: 12px;
    }
`;

export const FeatureHeaderStyled = styled.h2`
    margin-bottom: 8px;
    font-size: 22px;
`;

export const FeatureParagraphStyled = styled.p`
    font-size: 18px;
    color: ${({ theme }) => theme.colors.subTextColor};
`;

export const WelcomeParagraphStyled = styled.p`
    font-size: 20px;
    color: ${({ theme }) => theme.colors.subTextColor};
    margin-bottom: 10px;
    text-align: center;
`;

export const WelcomeButtonStyled = styled(PrimaryButtonStyled)`
    margin: 10px 0px;
`;

export const WelcomePageSubHeaderStyled = styled(PageHeader2Styled)`
    font-size: 24px;
    margin-left: 2.5%;
    opacity: 0;
    color: ${({ theme }) => theme.colors.headline};
    animation: 1s ${popUp} forwards ${(props) => props.$delay?`${props.$delay}s`: '0s'};
    -webkit-animation: 1s ${popUp} forwards ${(props) => props.$delay?`${props.$delay}s`: '0s'};
    -ms-animation: 1s ${popUp} forwards ${(props) => props.$delay?`${props.$delay}s`: '0s'};
    -moz-animation: 1s ${popUp} forwards ${(props) => props.$delay?`${props.$delay}s`: '0s'};
    @media only screen and ${devices.md} {
        align-self: center;
        margin: 20px 0px 0px 0px;
    }
`;

export const VideoPlayerContainerStyled = styled.div`
    margin: 10px 0px;
    height: 540px;
    width: 960px;
    @media only screen and ${devices.md} {
        height: 180px;
        width: 340px;
    }
`;
