import React, { useEffect, useState } from 'react';
import plans from '../data/plans';
import { useAuth } from '../hooks/useAuth';
import { usePayments } from '../hooks/usePayments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { ProfileContentContainerStyled, ProfileHeaderContainerStyled, ProfileTextStyled, ActionButtonStyled } from '../styles/Profile';
import { ContainerStyled, ModalBackgroundStyled, PageHeaderStyled } from '../styles/Main';
import Loading from './Loading';
import Products from './Products';
import { PlanViewContainerStyled, PlansButton } from '../styles/Form';


const Profile = () => { 
    const { user, logOut } = useAuth();
    const { getCurrentPlan, getCustomer, findPlan, manageSubscription, checkout } = usePayments();
    const [subscription, setSubscription] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [showPlans, setShowPlans] = useState(0);
    const [selectedPlan, setSelectedPlan] = useState(plans[0].prices.priceId);
    const [loading, setLoading] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const getDetails = async () => {
            let sub = await getCurrentPlan(user.uid);
            let cust = await getCustomer(user.email);
            setSubscription(sub)
            setCustomer(cust)
        }
        getDetails()
    }, [user.uid, getCurrentPlan, user.email, getCustomer])
    

    const loadCheckout = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(1);
        try {
            let p = findPlan(plans, selectedPlan)
            await checkout(p, user.uid, '/profile', '/profile' )
        } catch (error) {
            setLoading(0)
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage)
            console.log(errorCode, errorMessage);
        }
    }

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
            
            {
                showPlans===1?
                <ModalBackgroundStyled>
                    <Products
                    plans={plans} 
                    setShowPlans={setShowPlans} 
                    selectedPlan={selectedPlan} 
                    setSelectedPlan={setSelectedPlan}
                    onContinue={loadCheckout}
                    continueText={'Continue to Pay'}
                    />
                </ModalBackgroundStyled>
                :
                null
            } 
            <ProfileContentContainerStyled>
                <ProfileHeaderContainerStyled>
                    <PageHeaderStyled>Profile</PageHeaderStyled>
                    <h4>Email: {user.email.length>35?`${user.email.slice(0,35)}..`:user.email}</h4>
                </ProfileHeaderContainerStyled>
                
                {   customer && subscription?.status?
                    <>
                        <ProfileTextStyled>Status: <FontAwesomeIcon icon={faCircle} size={"xs"} color={subscription?.status==='active'?'green':'red'} /> <span style={{color: subscription?.status==='active'?'green':'red'}}>{subscription?.status.charAt(0).toUpperCase() + subscription?.status.slice(1)}</span></ProfileTextStyled>
                        <ProfileTextStyled>Queries Remaining: {customer.queries}</ProfileTextStyled>
                        <ProfileTextStyled>Plan: ${subscription?.plan.price.unit_amount/100} / {subscription?.plan.plan.interval}</ProfileTextStyled>
                        <ProfileTextStyled>Member since: {subscription?.current_period_start_date}</ProfileTextStyled>
                        <ProfileTextStyled>Renewal date: {subscription?.current_period_end_date}</ProfileTextStyled>
                        <ActionButtonStyled 
                            onClick={loadBillingPortal}
                        >Manage Account</ActionButtonStyled>
                    </>:
                    subscription===null && customer===null?
                    <div>Loading...</div>:
                    <div>
                        <p>Please pay for an account before talking to the assistant</p>
                        {error!==''?<p>{error}</p>:null}
                        <PlanViewContainerStyled>
                            Selected Plan: {plans.filter(p => p.prices.priceId === selectedPlan)[0].name}
                            {'  '}${plans.filter(p => p.prices.priceId === selectedPlan)[0].prices.priceData.unit_amount/100}
                            <PlansButton onClick={() => setShowPlans(1)}>Show plans</PlansButton>
                        </PlanViewContainerStyled>
                    </div>
                    
                }
            </ProfileContentContainerStyled>
            <ActionButtonStyled onClick={() => logOut()}>Signout</ActionButtonStyled>
        </ContainerStyled>
    )
}
 
export default Profile;