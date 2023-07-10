import React from 'react';
import Tab from './Tab'
import { TabsContainerStyled } from '../styles/Tabs';

function Tabs({activeTab, customer, subscription, plans, selectedPlan, setSelectedPlan}) {

    return (
        <TabsContainerStyled>
            <Tab tab={activeTab} customer={customer} subscription={subscription} plans={plans} selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan}/>
        </TabsContainerStyled>  
            

    );
}

export default Tabs;