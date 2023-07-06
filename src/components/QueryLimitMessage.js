import React from 'react';
import { ContainerStyled, ContentHeaderStyled, CloseButton } from '../styles/Main';
import { PrimaryButtonStyled, SecondaryButtonStyled } from '../styles/Button';
import { usePayments } from '../hooks/usePayments';
import { useNavigate } from 'react-router-dom'
import iconMap from '../data/iconMap';

function QueryLimitMessage({customer, subscription, setShowQueryLimitMessage}) {
    const { manageSubscription } = usePayments();
    const navigate = useNavigate();

    return (
        <ContainerStyled>
            <CloseButton onClick={() => setShowQueryLimitMessage(0)}>{iconMap['X']}</CloseButton>
            <ContentHeaderStyled>Query Limit Reached!</ContentHeaderStyled>
            <p>You are out of assistant queries! Please upgrade your account or wait until renewal date: {subscription.current_period_end_date}.</p> 
            <PrimaryButtonStyled onClick={() => manageSubscription(customer.stripeId)}>Manage Account</PrimaryButtonStyled>
            <SecondaryButtonStyled onClick={() => {navigate('/profile')}}>Go to Profile</SecondaryButtonStyled>
        </ContainerStyled>
    );
}

export default QueryLimitMessage