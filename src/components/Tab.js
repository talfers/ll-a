import React from 'react';
import Form from './Form'
import Loading from './Loading';
import { TabContentContainerStyled } from '../styles/Tabs'
import { PageHeader2Styled, PageHeaderSubTextStyled, PageHeaderSubTextMobileStyled, SpacerStyled } from '../styles/Main';

function Tab({tab, customer, subscription, selectedPlan, setSelectedPlan, plans}) {

    return (
        <TabContentContainerStyled>
            {
                tab.loading?
                <Loading message={"Awaiting response from assistant.."}/>:<></>
            }
                <div>
                    <PageHeader2Styled id={'tab-header'}>{tab.title}</PageHeader2Styled>
                    {   tab.step===0?
                        <>
                            <PageHeaderSubTextStyled>{tab.shortDescription}</PageHeaderSubTextStyled>
                            <PageHeaderSubTextMobileStyled>{tab.shortDescription}</PageHeaderSubTextMobileStyled>
                        </>
                        :<SpacerStyled />
                    }
                    <div>
                        <Form tab={tab} customer={customer} subscription={subscription} plans={plans} selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan}/>
                    </div>
                </div>
        </TabContentContainerStyled>
    );
}

export default Tab