import React, {useState} from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Recaptcha from './Recaptcha';
import { 
    FormSectionStyled, 
    ButtonContainerStyled, 
    FormContainerStyled, 
    InputContainerStyled, 
    InputStyled, 
    LabelStyled, 
    GoogleButtonStyled, 
    GoogleButtonContainerStyled,
    OrContainerStyled,
    HrStyled,
    InputIconStyled
} from '../styles/Form';
import { NavLinkWrapper, PageHeaderStyled } from '../styles/Main';
import { PrimaryButtonStyled } from '../styles/Button';
import iconMap from '../data/iconMap';


const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const { signIn, signInWithGoogle } = useAuth();
    const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault()
        if (isCaptchaSuccessful) {
            setError('')
            try {
                await signIn(email, password)
                navigate("/");
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage)
                console.log(errorCode, errorMessage);
            }
        } else {
            setError('Please confirm you are not a robot before continuing');
        }
    }

    const updateSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    }

    const onSubmitWithGoogle = async () => {
        setError('')
        try {
            await signInWithGoogle()
            navigate("/");
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message.replace('Firebase: ', '');
            setError(errorMessage)
            console.log(errorCode, errorMessage);
        }
    }

    const onRecaptchaChange = (value) => {
        setIsCaptchaSuccess(true)
    }
 
    return(
        <main>        
            <FormSectionStyled>
                <PageHeaderStyled>Sign In</PageHeaderStyled>
                <FormContainerStyled>                                
                    <form>                                              
                        <InputContainerStyled>
                            <LabelStyled htmlFor="email-address">
                                Email address
                            </LabelStyled>
                            <InputStyled
                                id="email-address"
                                name="email"
                                type="email"                                    
                                required                                                                                
                                placeholder="Email address"
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                            <InputIconStyled>{iconMap['User_Solid']}</InputIconStyled>
                        </InputContainerStyled>

                        <InputContainerStyled >
                            <LabelStyled htmlFor="password">
                                Password
                            </LabelStyled>
                            <InputStyled
                                id="password"
                                name="password"
                                type={secureTextEntry ? `password`: `text`}                                   
                                required                                                                                
                                placeholder="Password"
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                            {<InputIconStyled $clickable onClick={updateSecureTextEntry}>{secureTextEntry?iconMap['Eye']:iconMap['Eye_Slash']}</InputIconStyled>}
                        </InputContainerStyled>
                        <Recaptcha data-size={'compact'} onChange={onRecaptchaChange}/>
                        {error!==''?<p>{error}</p>:null}
                        
                        <ButtonContainerStyled>
                            <PrimaryButtonStyled  
                                $grouped                                
                                onClick={onSubmit}                                        
                            >      
                                Sign in                                                                  
                            </PrimaryButtonStyled>

                        </ButtonContainerStyled>
                        <OrContainerStyled><HrStyled/><p>OR</p><HrStyled/></OrContainerStyled>
                        <GoogleButtonContainerStyled>
                            <GoogleButtonStyled onClick={onSubmitWithGoogle}>Continue with Google</GoogleButtonStyled>
                        </GoogleButtonContainerStyled>
                                                
                    </form>
                    
                    <p>
                        No account yet? {' '}
                        <NavLinkWrapper to="/signup">
                            Sign up
                        </NavLinkWrapper>
                    </p>
                    <p>
                        Need password reset? {' '}
                        <NavLinkWrapper to="/reset">
                            Reset Password
                        </NavLinkWrapper>
                    </p>                        
                </FormContainerStyled>
            </FormSectionStyled>
        </main>
    )
}
 
export default SignIn