import React from 'react';
import { 
    ProductsContainerStyled, 
    ProductContainerStyled, 
    IconContainerStyled, 
    ProductModalStyled,
    ButtonContainerStyled,
    ProductHeader,
    ProductText
} from '../styles/Products';
import iconMap from '../data/iconMap';
import { ContentHeaderStyled, CloseButton } from '../styles/Main';
import { PrimaryButtonStyled } from '../styles/Button';
import { FontAwesomeIconWrapper } from '../styles/Main';
import { IconContext } from "react-icons";


function Products(props) {

    const createPlans = () => {
        return props.plans.map((p, i) => (
            <ProductContainerStyled key={i} selected={props.selectedPlan===p.prices.priceId} onClick={() => {props.setSelectedPlan(p.prices.priceId)}}>
                <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
                    <IconContainerStyled>
                        <FontAwesomeIconWrapper>
                        {iconMap[p.name]}
                        </FontAwesomeIconWrapper>
                    </IconContainerStyled>
                </IconContext.Provider>
                <ProductHeader>{p.name}</ProductHeader>
                <ProductText $hideMobile $spaceBelow>{p.description}</ProductText>
                <ProductText><strong>Price:</strong> ${p.prices.priceData.unit_amount/100} / month</ProductText>
                <ProductText><span><strong>Up to: </strong>{p.up_to}</span> queries / month</ProductText>
            </ProductContainerStyled>
        ))
    }

    return (
        <>
            {
                props.loading?
                <ProductModalStyled>
                    <CloseButton onClick={() => {props.setShowPlans(0)}}>{iconMap['X']}</CloseButton>
                    <ContentHeaderStyled>Select a Plan</ContentHeaderStyled>
                    <ProductsContainerStyled>
                        {props.plans.length===0?<div>loading...</div>:
                        createPlans()
                        }
                    </ProductsContainerStyled>
                    <ButtonContainerStyled>
                        <PrimaryButtonStyled onClick={props.onContinue}>
                            {props.continueText}
                        </PrimaryButtonStyled>
                    </ButtonContainerStyled>
                    
                </ProductModalStyled>
                :
                <ProductModalStyled>
                    <CloseButton onClick={() => {props.setShowPlans(0)}}>{iconMap['X']}</CloseButton>
                    <div>Loading plans...</div>
                </ProductModalStyled>
            
            }
        </>
        
            
        
    );
}

export default Products;