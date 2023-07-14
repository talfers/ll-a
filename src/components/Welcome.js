import React from 'react';
import { WelcomeSectionStyled, FeaturesContainerStyled, FeatureContainerStyled, FeatureHeaderStyled, WelcomeParagraphStyled, FeatureParagraphStyled, WelcomePageSubHeaderStyled, WelcomeButtonStyled, WelcomeHeaderStyled } from '../styles/Welcome';
import { features } from '../data/welcome';
import iconMap from '../data/iconMap';
import VideoPlayer from './VideoPlayer';
import { IconContext } from "react-icons";
import { useNavigate } from 'react-router-dom';


const Welcome = () => {
    const navigate = useNavigate();

    const icons = { 'compelling_advertising': 'Advertising', 'binding_contracts': 'Contracts', 'professional_messaging': 'Messages', 'helpful_advice': 'Advice' }
    const createFeatures = () => {
        return Object.keys(features).map((f,i)=> (
            <IconContext.Provider key={i} value={{ style: { fontSize: '36px' } }}>
                <FeatureContainerStyled key={i} $delay={i * 0.3}>
                    <div>{iconMap[icons[f]]}</div>
                    <FeatureHeaderStyled>{f.charAt(0).toUpperCase()+f.slice(1).replaceAll('_', ' ')}</FeatureHeaderStyled>
                    <FeatureParagraphStyled>{features[f]}</FeatureParagraphStyled>
                </FeatureContainerStyled>
            </IconContext.Provider>
        ))
    }
    
  return (
    <WelcomeSectionStyled>
        <WelcomeHeaderStyled>Welcome to Landlord Assist! </WelcomeHeaderStyled>
        <WelcomeParagraphStyled>We are using AI to help landlords and property owners think less and get more done.</WelcomeParagraphStyled>
        <VideoPlayer path={'https://www.youtube.com/watch?v=JxIQCOrsxxg&ab_channel=ToshVelaga'} />
        <WelcomeButtonStyled onClick={() => {navigate('/signup')}}>Get Started</WelcomeButtonStyled>
        <WelcomePageSubHeaderStyled>What you get</WelcomePageSubHeaderStyled>
        <FeaturesContainerStyled>
            {createFeatures()}
        </FeaturesContainerStyled>
    </WelcomeSectionStyled>
  )
}
 
export default Welcome;