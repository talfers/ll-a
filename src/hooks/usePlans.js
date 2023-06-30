import { createContext, useContext, useCallback } from 'react';
import db from '../config/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { faChessKnight, faChessQueen, faChessPawn } from '@fortawesome/free-solid-svg-icons';

const PlansContext = createContext()

export const PlansContextProvider = ({children}) => {

  const getPlans = useCallback(async () => {
    const icons = [faChessPawn, faChessKnight, faChessQueen]
    try {
      const q = query(collection(db, "products"), where("active", "==", true));
      const querySnapshot = await getDocs(q);
      const products = []
      let i = 0;
      querySnapshot.forEach(async (productDoc) => {
        let product = Object(productDoc.data());
        product.id = productDoc.id
        product.icon = icons[i];
        product.up_to = Number(product.metadata.queries)
        i++;
        const priceSnapshot = await getDocs(collection(db, "products", productDoc.id, "prices"));
        priceSnapshot.forEach((price) => {
          product.prices = {
              priceId: price.id,
              priceData: Object(price.data())
          }
        });
        
        products.push(product)
      });
      return products
    } catch (err) {
      console.log(err.message);
      
    }
    
  }, [])


  const findPlan = (plans, priceId) => {
    return plans.filter(p => p.prices.priceId===priceId)[0]
  }


  return (
    <PlansContext.Provider value={{getPlans, findPlan}}>
      {children}
    </PlansContext.Provider>
  )
}

export const usePlans = () => {
  return useContext(PlansContext)
}