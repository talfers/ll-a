import styled, { keyframes } from 'styled-components';
import { devices } from "../data/constants";
import { NavLink } from 'react-router-dom';

export const popUp = keyframes`   
    0% {
        transform: translateY(5%);
        -webkit-transform: translateY(5%);
        -ms-transform: translateY(5%);
        -moz-transform: translateY(5%);
        opacity: 0;
        -webkit-opacity: 0;
        -ms-opacity: 0;
        -moz-opacity: 0;
    }
    100% {
        transform: translateY(0);
        -webkit-transform: translateY(0);
        -ms-transform: translateY(0);
        -moz-transform: translateY(0);
        opacity: 1;
        -webkit-opacity: 1;
        -ms-opacity: 1;
        -moz-opacity: 1;
    }
`;

export const ContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 85%;
    max-width: 1200px;
    text-align: center;
    margin: 0px auto;
    padding: 20px;
    position: relative;
    background: ${({ theme }) => theme.colors.cardBG};
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.cardText};
    @media only screen and ${devices.xxl} {
        max-width: 2000px;
    }
`;

export const ParagraphStyled = styled.p`
    color: ${({ theme }) => theme.colors.cardText};
    @media only screen and ${devices.md} {
        
    }
`;

export const ContentHeaderStyled = styled.h1`
    color: ${({ theme }) => theme.colors.headline};
    font-weight: 700;
    font-family: inherit;
    font-size: 36px;
    margin-bottom: 10px;
    @media only screen and ${devices.md} {
        font-size: 24px;
    }
`;

export const CloseButton = styled.div`
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 92;
`;

export const NavLinkWrapper = styled(NavLink)`
    color: ${({ theme }) => theme.colors.contrastText};
`;

export const FontAwesomeIconWrapper = styled.div`
    color: ${({ theme }) => theme.colors.contrastText};
`;

export const ModalBackgroundStyled = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.opacityColor};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 75;
`;

export const PageHeaderStyled = styled.h1`
    font-size: 2em;
    color: ${({ theme }) => theme.colors.cardText};
    align-self: flex-start;
`;

export const PageHeader2Styled = styled.h2`
    font-size: 1.5em;
    color: ${({ theme }) => theme.colors.cardText};
    align-self: flex-start;

`;

export const PageHeader3Styled = styled.h3`
    font-size: 1.25em;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.cardText};
    align-self: flex-start;

`;

export const PageHeaderSubTextStyled = styled.p`
    margin: 16px 0px;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.subTextColor};
    text-align: left;
    align-self: flex-start;
    @media only screen and ${devices.md} {
        display: none;
    }
    
`;

export const PageHeaderSubTextMobileStyled = styled.p`
    margin: 16px 0px;
    display: none;
    @media only screen and ${devices.md} {
        display: block;
    }
`;

export const DividerStyled = styled.hr`
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    width: 320px;
    margin: 10px 0px;
`;

export const PageSubTitleStyled = styled.p`
    margin: 4px 0px 12px 0px;
    font-size: 1em;
    color: ${({ theme }) => theme.colors.subTextColor};
    text-align: left;
    align-self: flex-start;
`;

export const CopySnack = styled.span`
    padding: 10px;
    background-color: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.contrastText};
    border: 1.5px solid ${({ theme }) => theme.colors.contrastText};
    border-radius: 4px;
    position: absolute;
    width: ${props => props.$size?`${props.$size}px`:''};
    display: flex;
    align-items: center;
    justify-content: space-between;
    left:  ${props => props.$size?`calc(50% - ${props.$size/2}px)`:''};
`;

export const SpacerStyled = styled.div`
    width: 100%;
    height: 20px;
`;

export const NewBannerStyled = styled.div`
    background: #D2122E;
    padding: 4px 8px;
    position: absolute;
    font-size: 10px;
    color: white;
    top: 0px;
    right: 16px;
    border-radius: 0px 0px 4px 4px;
`;

export const InfoBubbleStyled = styled.div`
    height: 20px;
    color: ${({ theme }) => theme.colors.subTextColor};
    position: absolute;
    right: 0px;
    top: 4px;
    display: flex;
    flex-direction: column;
    max-width: 200px;
`;

export const InfoBubbleTextContainerStyled = styled.div`
    display: ${props => props.$displayed?`block`:'none'};
    background: ${({ theme }) => theme.colors.opacityColor};
    padding: 12px;
    border-radius: 4px;
    font-size: 12px;
    z-index: 1;
`;

export const InfoBubbleTextStyled = styled.div``;

export const InfoIconStyled = styled.div`
    align-self: flex-end;
`;