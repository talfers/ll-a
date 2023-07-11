import axios from 'axios';
import { createContext, useContext, useCallback, useState } from 'react';
import db from '../config/firebase';
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { loadStripe } from '@stripe/stripe-js';
import config from '../config';
const stripe = await loadStripe(config.REACT_APP_STRIPE_PUBLIC_KEY);


const PaymentsContext = createContext()

export const PaymentsContextProvider = ({children}) => {
  const [error, setError] = useState('')


  const checkout = async (plan, userId, success_endpoint, cancel_endpoint) => {
    const docRef = await addDoc(collection(db, "customers", userId, "checkout_sessions"), {
        price: plan.prices.priceId,
        success_url: `${config.REACT_APP_PROD_URL}${success_endpoint}`,
        cancel_url: `${config.REACT_APP_PROD_URL}${cancel_endpoint}`,
    });
    onSnapshot(docRef, async (snap) => {
        const {error, sessionId} = snap.data()
        if(error) {
            alert(`An error occured: ${error.message}`)
            setError(error.message)
        } 
        if(sessionId) {
            await stripe.redirectToCheckout({ sessionId });
            
        }
    })
  }

  const updateQueryLimit = useCallback(async (userId) => {
    try {
      const { data, status } = await axios.post(config.REACT_APP_UPDATE_QUERY_LIMIT_URL, {userId})
      if (status === 200) {
        console.log(data.message, 'Status: ', status);
      }
      else {
        setError(data.message)
      }
    } catch (error) {
      console.log(`Error updating query limit. Error: ${error.message}`);
      setError(error.message)
    }
  }, [])


  const manageSubscription = async (customerId) => {
    try {
      const { data, status } = await axios.post(config.REACT_APP_BILLING_PORTAL_URL, {customerId, returnUrl: window.location.origin})
      if (status === 200) {
        window.location.assign(data.url);
      }
      else {
        setError(data.message)
      }
    } catch (error) {
      console.log(`Error updating query limit. Error: ${error.message}`);
      setError(error.message)
    }
  }


  const getCustomer = useCallback(async (userId) => {
    try {
      const { data, status } = await axios.post(config.REACT_APP_GET_CUSTOMER_URL, {userId})
      if (status === 200) {
        return data.customer;
      }
      else {
        setError(data.message);
        return null
      }
    } catch (error) {
      console.log(`Error updating query limit. Error: ${error.message}`);
      setError(error.message)
    }
  }, [])


  const getCurrentPlan = useCallback(async (userId) => {
    try {
      const { data, status } = await axios.post(config.REACT_APP_GET_SUBSCRIPTION_URL, {userId})
      if (status === 200) {
        return data.subscription
      }
      else {
        setError(data.message);
        console.log(data.message);
        return null
      }
    } catch (error) {
      console.log(`Error updating query limit. Error: ${error.message}`);
      setError(error.message)
    }
  }, [])


  const getProducts = useCallback(async () => {
    try {
      const { data, status } = await axios.post(config.REACT_APP_GET_PRODUCTS_URL)
      if (status === 200) {
        return data.products;
      }
      else {
        setError(data.message);
        console.log(data.message);
        return null
      }
    } catch (error) {
      console.log(`Error getting products. Error: ${error.message}`);
      setError(error.message)
      return null
    }
  }, [])


  const findPlan = (plans, priceId) => {
    return plans.filter(p => p.prices.priceId===priceId)[0]
  }
  

  // const checkout = async (plan, userId, success_endpoint, cancel_endpoint) => {
  //   try {
  //     const res = await axios.post(config.REACT_APP_GET_SESSION_ID_URL, {plan, userId, success_endpoint, cancel_endpoint})
  //     console.log(res);      
      
  //   } catch (error) {
  //     console.log(`Error updating query limit. Error: ${error.message}`);
  //   }
  // }
  

  return (
    <PaymentsContext.Provider value={{checkout, getCurrentPlan, getCustomer, manageSubscription, updateQueryLimit, findPlan, getProducts, error}}>
      {children}
    </PaymentsContext.Provider>
  )
}

export const usePayments = () => {
  return useContext(PaymentsContext)
}