import React from 'react';
import Form from './Form'
import Loading from './Loading';
import { TabContentContainerStyled } from '../styles/Tabs'
import { PageHeader2Styled, PageHeaderSubTextStyled, PageHeaderSubTextMobileStyled } from '../styles/Main';

function Tab(props) {
    return (
        <TabContentContainerStyled>
            {
                props.tab.loading?
                <Loading message={"Awaiting response from assistant.."}/>:<></>
            }
                <div>
                    <PageHeader2Styled>{props.tab.title}</PageHeader2Styled>
                    {   props.tab.step===0?
                        <>
                            <PageHeaderSubTextStyled>{props.tab.text}</PageHeaderSubTextStyled>
                            <PageHeaderSubTextMobileStyled>{props.tab.shortDescription}</PageHeaderSubTextMobileStyled>
                        </>
                        :null
                    }
                    <div>
                        <Form tab={props.tab}  customer={props.customer} subscription={props.subscription} />
                    </div>
                </div>
        </TabContentContainerStyled>
    );
}

export default Tab