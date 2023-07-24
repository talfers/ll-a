import React, { useContext, useState } from 'react';
import iconMap from '../data/iconMap';
import { useSnack } from '../hooks/useSnack';
import { useDownloadFile } from "../hooks/useDownloadFile";
import { FontAwesomeIconWrapper, PageHeader2Styled, CopySnack, ModalBackgroundStyled } from '../styles/Main';
import { Context as TaskContext } from '../context/TaskContext';
import { 
    ResponseActionButtonsContainerStyled, 
    ResponseContainerStyled, 
    ResponseHeaderStyled, 
    ResponseStyled, 
    ResponseButtonStyled, 
    ResponseItem, 
    RefreshButtonStyled,
    ResponseTitleContainerStyled
} from '../styles/Response'
import Loading from './Loading';
import { useAuth } from '../hooks/useAuth';
import { usePayments } from '../hooks/usePayments';
import Products from './Products';
import QueryLimitMessage from './QueryLimitMessage';


function Response({plans, selectedPlan, setSelectedPlan, tab, customer, subscription}) {
    const [snack, showSnack] = useSnack();
    const [downloadFile] = useDownloadFile();
    const { user } = useAuth();
    const {postTaskData, resetResponse, updateLoading} = useContext(TaskContext);
    const { updateQueryLimit, checkout, findPlan } = usePayments();
    const [error, setError] = useState('');
    const [showQueryLimitMessage, setShowQueryLimitMessage] = useState(0);
    const [showPlans, setShowPlans] = useState(0);
    const [loading, setLoading] = useState(0);



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


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(subscription?.status==='active') {
            if(customer.queries > 0) {
                resetResponse(tab.id)
                updateLoading(tab.id, true)
                updateQueryLimit(user.uid)
                try {
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

    const generateResponse = () => {
        if ([0,1,2,3,4].includes(tab.id)) {
            let response = tab.response.split('\n');
            return response.map((item, i) => (
                <ResponseItem key={i}>
                    <p>{item}</p>
                </ResponseItem>
            ));
        } else {
            return tab.response
        }
    }

    return (
            <ResponseContainerStyled>
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
                    </ModalBackgroundStyled>:
                    null
                } 
                {
                    tab.response&&loading===0?
                    null
                    :<Loading message={"Loading..."}/>
                }
                <ResponseHeaderStyled>
                    <ResponseTitleContainerStyled>
                        <PageHeader2Styled>Assistant Response</PageHeader2Styled>
                        <RefreshButtonStyled onClick={handleSubmit}>
                            {iconMap['Refresh']}
                        </RefreshButtonStyled>
                    </ResponseTitleContainerStyled>
                    {tab.response!==''?
                        <ResponseActionButtonsContainerStyled>
                            
                            <ResponseButtonStyled onClick={() => {
                                navigator.clipboard.writeText(tab.response)
                                showSnack('Copied!')}}>
                                <FontAwesomeIconWrapper>
                                    {iconMap['Copy']}
                                </FontAwesomeIconWrapper>
                            </ResponseButtonStyled>
                            <ResponseButtonStyled onClick={() => {
                                downloadFile('docx', 'response', tab.shortName)
                                showSnack('Doc Downloaded!')}}>
                                <FontAwesomeIconWrapper>
                                    {iconMap['Word']}
                                </FontAwesomeIconWrapper> 
                            </ResponseButtonStyled>
                            <ResponseButtonStyled onClick={() => {
                                downloadFile('pdf', 'response', tab.shortName)
                                showSnack('PDF Downloaded!')}}>
                                <FontAwesomeIconWrapper>
                                    {iconMap['Pdf']}
                                </FontAwesomeIconWrapper>
                            </ResponseButtonStyled>
                            
                        </ResponseActionButtonsContainerStyled>
                    :<></> 
                    }
                    {snack!==''?<CopySnack $size={snack.includes('Downloaded')?176:100}>{iconMap['Check']}{snack}</CopySnack>:<></>}
                    
                    
                </ResponseHeaderStyled>
                {error!==''?<div>{error}</div>:null}
                <ResponseStyled id='response'>{generateResponse()}</ResponseStyled>
            </ResponseContainerStyled>
            
        
    );
}

export default Response;