import axios from 'axios';
import { createContext, useContext, useCallback } from 'react';
import db from '../config/firebase';
import { collection, addDoc, onSnapshot, query, getDocs, where, doc, setDoc } from "firebase/firestore";
import { loadStripe } from '@stripe/stripe-js';
import config from '../config';


const PaymentsContext = createContext()

export const PaymentsContextProvider = ({children}) => {


  const addQueryLimit = useCallback(async (customerId, plan) => {
    try {
      const docRef = doc(db, 'customers', customerId);
      setDoc(docRef, {
        queries: plan.up_to, 
        planId: plan.id, 
        priceId: plan.prices.priceId
      }, 
      {merge: true}
      )
      console.log(`Plan limits added!`);
    } catch (error) {
      console.error('Error adding limits: ', error);
    }
  }, [])


  const checkout = async (plan, userId, success_endpoint, cancel_endpoint) => {
    const docRef = await addDoc(collection(db, "customers", userId, "checkout_sessions"), {
        price: plan.prices.priceId,
        success_url: `${config.REACT_APP_PROD_URL}${success_endpoint}`,
        cancel_url: `${config.REACT_APP_PROD_URL}${cancel_endpoint}`,
    });
    await addQueryLimit(userId, plan)
    onSnapshot(docRef, async (snap) => {
        const {error, sessionId} = snap.data()
        if(error) {
            alert(`An error occured: ${error.message}`)
        } 
        if(sessionId) {
            const stripe = await loadStripe(config.REACT_APP_STRIPE_PUBLIC_KEY);
            await stripe.redirectToCheckout({ sessionId });
            
        }
    })
  }


  const updateQueryLimit = useCallback(async (customerId, email) => {
    try {
      const res = await axios.post('http://127.0.0.1:5001/landlord-assistant/us-central1/updateQueryLimit', {customerId, email})
      console.log(res);
    } catch (error) {
      console.log(`Error updating query limit. Error: ${error.message}`);
    }
  }, [])


  const manageSubscription = async (customerId) => {
    try {
      const { data } = await axios.post('http://127.0.0.1:5001/landlord-assistant/us-central1/createBillingPortalSession', {customerId, returnUrl: window.location.origin})
      window.location.assign(data.url);
    } catch (error) {
      console.log(`Error updating query limit. Error: ${error.message}`);
    }
  }


  const getCustomer = useCallback(async (email) => {
    const q = query(collection(db, "customers"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    let tempCustomer = {}
    querySnapshot.forEach(async (d) => {
      tempCustomer = d.data();
    })
    return tempCustomer;
    
  }, [])


  const getCurrentPlan = useCallback(async (userId) => {
    const q = query(collection(db, "customers", userId, "subscriptions"));
    const querySnapshot = await getDocs(q);
    let tempSub = {}
    querySnapshot.forEach(async (sub) => {
      tempSub.role = sub.data().role
      tempSub.plan = sub.data().items.slice(-1)[0]
      tempSub.status = sub.data().status
      tempSub.current_period_end = sub.data().current_period_end.seconds
      tempSub.current_period_end_date = new Date(sub.data().current_period_end.seconds * 1000).toLocaleDateString("en-US")
      tempSub.current_period_start =  sub.data().current_period_start.seconds 
      tempSub.current_period_start_date = new Date(sub.data().current_period_start.seconds * 1000).toLocaleDateString("en-US")
    })
    return tempSub
  }, [])


  const findPlan = (plans, priceId) => {
    return plans.filter(p => p.prices.priceId===priceId)[0]
  }
  

  return (
    <PaymentsContext.Provider value={{checkout, getCurrentPlan, getCustomer, manageSubscription, addQueryLimit, updateQueryLimit, findPlan}}>
      {children}
    </PaymentsContext.Provider>
  )
}

export const usePayments = () => {
  return useContext(PaymentsContext)
}