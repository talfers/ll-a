import React from 'react';
import iconMap from '../data/iconMap';
import { useSnack } from '../hooks/useSnack';
import { useDownloadFile } from "../hooks/useDownloadFile";
import { FontAwesomeIconWrapper, PageHeader2Styled, CopySnack } from '../styles/Main';
import { 
    ResponseActionButtonsContainerStyled, 
    ResponseContainerStyled, 
    ResponseHeaderStyled, 
    ResponseStyled, 
    ResponseButtonStyled, 
    ResponseItem 
} from '../styles/Response'
import Loading from './Loading';


function Response(props) {
    const [snack, showSnack] = useSnack()
    const [downloadFile] = useDownloadFile()

    const generateResponse = () => {
        if ([0,1,2,3,4].includes(props.tab.id)) {
            let response = props.tab.response.split('\n');
            return response.map((item, i) => (
                <ResponseItem key={i}>
                    <p>{item}</p>
                </ResponseItem>
            ));
        } else {
            return props.tab.response
        }
    }

    return (
            <ResponseContainerStyled>
                {
                    props.tab.response?
                    null
                    :<Loading message={"Loading..."}/>
                }
                <ResponseHeaderStyled>
                    <PageHeader2Styled>Assistant Response</PageHeader2Styled>
                    {props.tab.response!==''?
                        <ResponseActionButtonsContainerStyled>
                            <ResponseButtonStyled onClick={() => {
                                navigator.clipboard.writeText(props.tab.response)
                                showSnack('Copied!')}}>
                                <FontAwesomeIconWrapper>
                                    {iconMap['Copy']}
                                </FontAwesomeIconWrapper>
                            </ResponseButtonStyled>
                            <ResponseButtonStyled onClick={() => {
                                downloadFile('docx', 'response', props.tab.shortName)
                                showSnack('Doc Downloaded!')}}>
                                <FontAwesomeIconWrapper>
                                    {iconMap['Word']}
                                </FontAwesomeIconWrapper> 
                            </ResponseButtonStyled>
                            <ResponseButtonStyled onClick={() => {
                                downloadFile('pdf', 'response', props.tab.shortName)
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
                <ResponseStyled id='response'>{generateResponse()}</ResponseStyled>
            </ResponseContainerStyled>
            
        
    );
}

export default Response;