import React, { useContext, useState } from 'react';
import { Context as TaskContext } from '../context/TaskContext';
import { useAuth } from '../hooks/useAuth';
import { usePayments } from '../hooks/usePayments';
import ProgressBar from './ProgressBar';
import { SectionContainerStyled, SectionsContainerStyled, FormContainerStyled, FormNavContainerStyled, BackButtonsContainerStyled } from '../styles/Form';
import { PrimaryButtonStyled, SecondaryButtonStyled} from '../styles/Button';
import Input from './Input';
import { ModalBackgroundStyled } from '../styles/Main';
import Loading from './Loading';
import Products from './Products';
import { useNavigate } from 'react-router-dom';
import QueryLimitMessage from './QueryLimitMessage';


function Form({tab, subscription, customer, selectedPlan, setSelectedPlan, plans}) {
    const navigate = useNavigate();
    const { user } = useAuth()
    const { updateQueryLimit, checkout, findPlan } = usePayments();
    const {postTaskData, incrementStep, decrementStep, resetResponse, updateLoading} = useContext(TaskContext);
    const [showPlans, setShowPlans] = useState(0);
    const [loading, setLoading] = useState(0);
    const [error, setError] = useState('');
    const [showQueryLimitMessage, setShowQueryLimitMessage] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(subscription?.status==='active') {
            if(customer.queries > 0) {
                resetResponse(tab.id)
                updateLoading(tab.id, true)
                updateQueryLimit(user.uid)
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

    const increment = () => {
        incrementStep(tab.id, tab.step)
        window.scrollTo(0, 0);
    }

    const decrement = () => {
        decrementStep(tab.id, tab.step)
        window.scrollTo(0, 0);
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
                    loading={plans.length>0}
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
                        <BackButtonsContainerStyled>
                        {
                            Object.keys(tab.inputs).length > 1?
                            <>
                                <SecondaryButtonStyled onClick={decrement}>Back</SecondaryButtonStyled>
                                <SecondaryButtonStyled $grouped onClick={() => resetResponse(tab.id)}>Restart</SecondaryButtonStyled>
                            </>
                            :null
                        }

                        </BackButtonsContainerStyled>
                        
                        
                        <PrimaryButtonStyled onClick={handleSubmit} id={tab.shortName}>{tab.submitMessage}</PrimaryButtonStyled>
                    </FormNavContainerStyled>:
                    <FormNavContainerStyled>
                        <BackButtonsContainerStyled>
                        {
                            tab.step>0?
                            <>
                                <SecondaryButtonStyled onClick={decrement}>Back</SecondaryButtonStyled>
                                <SecondaryButtonStyled $grouped onClick={() => resetResponse(tab.id)}>Restart</SecondaryButtonStyled>
                            </>
                            :null
                        }
                        </BackButtonsContainerStyled>
                        
                        {   tab.step===0?
                            <PrimaryButtonStyled onClick={increment}>Start</PrimaryButtonStyled>:
                            <PrimaryButtonStyled onClick={increment}>Next</PrimaryButtonStyled>
                        }
                    </FormNavContainerStyled>
                    
                }
            </form>
        </FormContainerStyled>
    );
}

export default Form