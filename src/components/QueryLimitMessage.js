import React, {useState} from 'react';
import { ContainerStyled, ContentHeaderStyled, CloseButton } from '../styles/Main';
import { PrimaryButtonStyled, SecondaryButtonStyled } from '../styles/Button';
import { usePayments } from '../hooks/usePayments';
import { useNavigate } from 'react-router-dom'
import iconMap from '../data/iconMap';
import Loading from './Loading';

function QueryLimitMessage({customer, subscription, setShowQueryLimitMessage}) {
    const { manageSubscription } = usePayments();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(0);
    const [error, setError] = useState('')

    const loadBillingPortal = async () => {
        setError('');
        setLoading(1);
        try {
            await manageSubscription(customer.stripeId)
            setLoading(0)
        } catch (error) {
            setLoading(0)
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage)
            console.log(errorCode, errorMessage);
        }
    }

    return (
        <ContainerStyled>
            {
                loading?
                <Loading message={"Loading..."}/>
                :null
            }
            <CloseButton onClick={() => setShowQueryLimitMessage(0)}>{iconMap['X']}</CloseButton>
            <ContentHeaderStyled>Query Limit Reached!</ContentHeaderStyled>
            <p>You are out of assistant queries! Please upgrade your account or wait until renewal date: {subscription.current_period_end_date}.</p> 
            <PrimaryButtonStyled onClick={loadBillingPortal}>Manage Account</PrimaryButtonStyled>
            <SecondaryButtonStyled onClick={() => {navigate('/profile')}}>Go to Profile</SecondaryButtonStyled>
            {error!==''?<p>{error}</p>:null}
        </ContainerStyled>
    );
}

export default QueryLimitMessage