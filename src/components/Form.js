import React, { useContext, useState } from 'react';
import plans from '../data/plans';
import { Context as TaskContext } from '../context/TaskContext';
import { useAuth } from '../hooks/useAuth';
import { usePayments } from '../hooks/usePayments';
import ProgressBar from './ProgressBar';
import { SectionContainerStyled, SectionsContainerStyled, FormContainerStyled, FormNavContainerStyled } from '../styles/Form';
import { PrimaryButtonStyled, SecondaryButtonStyled } from '../styles/Button';
import Input from './Input';
import { ModalBackgroundStyled } from '../styles/Main';
import Loading from './Loading';
import Products from './Products';
import { useNavigate } from 'react-router-dom';
import QueryLimitMessage from './QueryLimitMessage';


function Form({tab, subscription, customer}) {
    const navigate = useNavigate();
    const { user } = useAuth()
    const { updateQueryLimit, checkout, findPlan } = usePayments();
    const {postTaskData, incrementStep, decrementStep, resetResponse, updateLoading} = useContext(TaskContext);
    const [showPlans, setShowPlans] = useState(0);
    const [selectedPlan, setSelectedPlan] = useState(plans[0].prices.priceId);
    const [loading, setLoading] = useState(0);
    const [error, setError] = useState('');
    const [showQueryLimitMessage, setShowQueryLimitMessage] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(subscription?.status==='active') {
            if(customer.queries > 0) {
                resetResponse(tab.id)
                updateLoading(tab.id, true)
                updateQueryLimit(user.uid, user.email)
                try {
                    navigate('/response')
                    updateLoading(tab.id, false)
                    await postTaskData(tab);
                } catch (err) {
                    setError(err.message)
                    console.log(err.message);
                }
            } else {
                setShowQueryLimitMessage(1)
            }
            
        } else {
            setShowPlans(1);
        }
    }

    const loadCheckout = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(1)
        try {
            let p = findPlan(plans, selectedPlan)
            await checkout(p, user.uid, '/', '/' )
        } catch (err) {
            setLoading(0)
            const errorCode = err.code;
            const errorMessage = err.message;
            setError(errorMessage)
            alert(error)
            console.log(errorCode, errorMessage);
        }
    }

    const createInputs = () => {
        return Object.keys(tab.inputs).map((stepKey, i)=>(
            <SectionContainerStyled key={stepKey} $inactive={Object.keys(tab.inputs)[tab.step] !== stepKey} $active={Object.keys(tab.inputs)[tab.step] === stepKey}>
            {
                
                    Object.keys(tab.inputs[Object.keys(tab.inputs)[i]]).map((inputName) => (
                        <Input 
                            key={inputName} 
                            input={tab.inputs[Object.keys(tab.inputs)[i]][inputName]} 
                            tab={tab.id} 
                            section={Object.keys(tab.inputs)[i]}
                            name={inputName}
                        />
                    ))
                
            }
        </SectionContainerStyled>
        ))
    }

    return (
        <FormContainerStyled>
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
                :null
            } 
            {
                showQueryLimitMessage===1?
                <ModalBackgroundStyled>
                    <QueryLimitMessage
                        subscription={subscription}
                        customer={customer}
                        setShowQueryLimitMessage={setShowQueryLimitMessage}
                    />
                </ModalBackgroundStyled>
                :
                null
            } 
            {
                Object.keys(tab.inputs).length>1?<ProgressBar steps={Object.keys(tab.inputs)} step={tab.step}/>:<></> 
            }
            <form>
                <SectionsContainerStyled>
                    {createInputs()}
                </SectionsContainerStyled>
                {
                    tab.step === Object.keys(tab.inputs).length-1?
                    <FormNavContainerStyled>
                        {
                            Object.keys(tab.inputs).length > 1?
                            <SecondaryButtonStyled onClick={() => decrementStep(tab.id, tab.step)}>Back</SecondaryButtonStyled>:
                            <></>
                        }
                        
                        <PrimaryButtonStyled onClick={handleSubmit} id={tab.shortName}>{tab.submitMessage}</PrimaryButtonStyled>
                    </FormNavContainerStyled>:
                    <FormNavContainerStyled>
                        {
                            tab.step>0?
                            <SecondaryButtonStyled onClick={() => decrementStep(tab.id, tab.step)}>Back</SecondaryButtonStyled>:
                            <></> 
                        }
                        {   tab.step===0?
                            <PrimaryButtonStyled onClick={() => incrementStep(tab.id, tab.step)}>Start</PrimaryButtonStyled>:
                            <PrimaryButtonStyled onClick={() => incrementStep(tab.id, tab.step)}>Next</PrimaryButtonStyled>
                        }
                    </FormNavContainerStyled>
                    
                }
            </form>
        </FormContainerStyled>
    );
}

export default Form