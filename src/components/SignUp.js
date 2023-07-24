import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { usePayments } from '../hooks/usePayments';
import Loading from './Loading';
import Recaptcha from './Recaptcha';
import { 
    FormSectionStyled, 
    ButtonContainerStyled, 
    FormContainerStyled, 
    InputContainerStyled, 
    InputStyled, 
    LabelStyled, 
    PlansButton,
    PlanViewContainerStyled,
    InputIconStyled,
} from '../styles/Form';
import { PrimaryButtonStyled } from '../styles/Button';
import { ModalBackgroundStyled, NavLinkWrapper, PageHeaderStyled } from '../styles/Main';
import Products from './Products';
import { useLocalStorage } from '../hooks/useLocalStorage';
import iconMap from '../data/iconMap';


const SignUp = ({ plans, setSelectedPlan, selectedPlan }) => {
    const { signUp, verificationEmail } = useAuth();
    const { checkout, findPlan } = usePayments();
    const [visited, setVisited] = useLocalStorage("visited", false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);
    const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(false);
    const [showPlans, setShowPlans] = useState(1);
    const [loading, setLoading] = useState(0);

    useEffect(() => {
        if(!visited) {
            setVisited(true);
        }
    }, [visited, setVisited])

    const loadCheckout = async (priceId, userId) => {
        let p = findPlan(plans, priceId)
        await checkout(p, userId, '/thankyou', '/signup' )
    }

    const onContinue = () => {
        setSelectedPlan(selectedPlan);
        setShowPlans(0)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (isCaptchaSuccessful) {
            if(password===confirmPassword) {
                setError('')
                setLoading(1)
                try {
                    let user = await signUp(email, password);
                    await verificationEmail();
                    await loadCheckout(selectedPlan, user.uid)
                } catch (error) {
                    setLoading(0)
                    const errorCode = error.code;
                    const errorMessage = error.message.replace('Firebase: ', '');
                    setError(errorMessage)
                    console.log(errorCode, errorMessage);
            }
            } else {
                setError(`Passwords don't match!`)
            }
            
        } else {
            setLoading(0)
            setError('Please confirm you are not a robot before continuing')
        }
    }

    const updateSecureTextEntry = (val) => {
        setSecureTextEntry(!secureTextEntry);
    }

    const updateSecureTextEntryConfirm = (val) => {
        setSecureTextEntryConfirm(!secureTextEntryConfirm);
    }


    const onRecaptchaChange = (value) => {
        setIsCaptchaSuccess(true)
    }

  return (
    <main>
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
                onContinue={onContinue}
                continueText={'Continue'}
                loading={plans.length>0}
                />
            </ModalBackgroundStyled>
            :
            null
        } 
        <FormSectionStyled>
            <PageHeaderStyled>Sign Up</PageHeaderStyled>
            <FormContainerStyled>                                                                                           
                <form>                                                                                            
                    <InputContainerStyled>
                        <LabelStyled htmlFor="email-address">
                            Email address
                        </LabelStyled>
                        <InputStyled
                            type="email"
                            label="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}  
                            required                                    
                            placeholder="Email address"                                
                        />
                        <InputIconStyled>{iconMap['User_Solid']}</InputIconStyled>
                    </InputContainerStyled>
                    
                    <InputContainerStyled>
                        <LabelStyled htmlFor="password">
                            Password
                        </LabelStyled>
                        <InputStyled
                            type={secureTextEntry ? `password`: `text`}
                            label="Create password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required                                 
                            placeholder="Password"   
                        />
                        {<InputIconStyled onClick={updateSecureTextEntry}>{secureTextEntry?iconMap['Eye']:iconMap['Eye_Slash']}</InputIconStyled>}
                    </InputContainerStyled>
                    <InputContainerStyled>
                        <LabelStyled htmlFor="confirmPassword">
                            Confirm Password
                        </LabelStyled>
                        <InputStyled
                            type={secureTextEntryConfirm ? `password`: `text`}
                            label="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required                                 
                            placeholder="Confirm Password"   
                        />
                        {<InputIconStyled onClick={updateSecureTextEntryConfirm}>{secureTextEntryConfirm?iconMap['Eye']:iconMap['Eye_Slash']}</InputIconStyled>}
                    </InputContainerStyled>
                    {
                        plans.length>0?
                        <PlanViewContainerStyled>
                            Selected Plan: {plans.filter(p => p.prices.priceId === selectedPlan)[0].name}
                            {'  '}${plans.filter(p => p.prices.priceId === selectedPlan)[0].prices.priceData.unit_amount/100}
                            <PlansButton onClick={() => setShowPlans(1)}>Show plans</PlansButton>
                        </PlanViewContainerStyled>
                        :<div>Loading plans...</div>

                    }
                    
                    
                    <Recaptcha onChange={onRecaptchaChange}/>
                    {error!==''?<p>{error}</p>:null}
                                                       
                    <ButtonContainerStyled>
                        <PrimaryButtonStyled
                            $grouped
                            type="submit" 
                            onClick={onSubmit}                        
                        >  
                            Sign up                                
                        </PrimaryButtonStyled>
                    </ButtonContainerStyled>                               
                </form>
                
                <p>
                    Already have an account?{' '}
                    <NavLinkWrapper to="/signin" >
                        Sign in
                    </NavLinkWrapper>
                </p>                   
            </FormContainerStyled>
        </FormSectionStyled>
    </main>
  )
}
 
export default SignUp