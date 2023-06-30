import React from 'react';
import Tab from './Tab'
import { TabsContainerStyled } from '../styles/Tabs';

function Tabs({activeTab, customer, subscription, plans}) {

    return (
        <TabsContainerStyled>
            <Tab tab={activeTab} customer={customer} subscription={subscription} plans={plans}/>
        </TabsContainerStyled>  
            

    );
}

export default Tabs;