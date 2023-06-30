import React from 'react';
import Form from './Form'
import Loading from './Loading';
import { TabContentContainerStyled } from '../styles/Tabs'
import { PageHeader2Styled, PageHeaderSubTextStyled, PageHeaderSubTextMobileStyled } from '../styles/Main';

function Tab({tab, customer, subscription}) {

    return (
        <TabContentContainerStyled>
            {
                tab.loading?
                <Loading message={"Awaiting response from assistant.."}/>:<></>
            }
                <div>
                    <PageHeader2Styled>{tab.title}</PageHeader2Styled>
                    {   tab.step===0?
                        <>
                            <PageHeaderSubTextStyled>{tab.text}</PageHeaderSubTextStyled>
                            <PageHeaderSubTextMobileStyled>{tab.shortDescription}</PageHeaderSubTextMobileStyled>
                        </>
                        :null
                    }
                    <div>
                        <Form tab={tab}  customer={customer} subscription={subscription} />
                    </div>
                </div>
        </TabContentContainerStyled>
    );
}

export default Tab