import React from 'react';
import { useSnack } from '../hooks/useSnack';
import { useAuth } from '../hooks/useAuth';
import { ContainerStyled, NavLinkWrapper, ParagraphStyled } from '../styles/Main';
import { CopySnack } from '../styles/Main';
import { IconContext } from "react-icons";
import iconMap from '../data/iconMap';

const VerifyEmail = () => {
  const { user, verificationEmail } = useAuth();
  const [snack, showSnack] = useSnack();

  const resendEmail = async () => {
    try {
      await verificationEmail()
      showSnack('Email resent!')
    } catch (err) {
      showSnack(err.message)
    }
  }

  return (
    <ContainerStyled>
      <ParagraphStyled>You must verify your email at {user.email} before using Landlord Assist.</ParagraphStyled>
      <p style={{margin: '16px 0px 16px 0px'}}><NavLinkWrapper to="/signin">Back to Sign in</NavLinkWrapper></p>
      {snack!==''?<CopySnack $size={148}><IconContext.Provider value={{ style: { fontSize: '18px', color: 'green' } }}>{iconMap['Snack_Check']}</IconContext.Provider>{snack}</CopySnack>:<></>}
      <div style={{color: 'black'}}><p>Didn't receive the email?   <span style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={resendEmail}>Resend</span></p></div>
    </ContainerStyled>
  )
}
 
export default VerifyEmail;