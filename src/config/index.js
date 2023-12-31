import keys from '../keys'
import db, { provider, analytics, auth } from './firebase'

const config = { 
    db, 
    provider, 
    analytics, 
    auth, 
    REACT_APP_PROD_URL: keys.REACT_APP_PROD_URL,
    REACT_APP_STRIPE_PUBLIC_KEY: keys.REACT_APP_STRIPE_PUBLIC_KEY, 
    REACT_APP_FIREBASE_API_KEY: keys.REACT_APP_FIREBASE_API_KEY,
    REACT_APP_RECAPTCHA_SITE_KEY: keys.REACT_APP_RECAPTCHA_SITE_KEY,
    REACT_APP_UPDATE_QUERY_LIMIT_URL: keys.REACT_APP_UPDATE_QUERY_LIMIT_URL,
    REACT_APP_BILLING_PORTAL_URL: keys.REACT_APP_BILLING_PORTAL_URL,
    REACT_APP_CHECKOUT_URL: keys.REACT_APP_CHECKOUT_URL,
    REACT_APP_GET_CUSTOMER_URL: keys.REACT_APP_GET_CUSTOMER_URL,
    REACT_APP_GET_SUBSCRIPTION_URL: keys.REACT_APP_GET_SUBSCRIPTION_URL,
    REACT_APP_GET_PRODUCTS_URL: keys.REACT_APP_GET_PRODUCTS_URL,
    REACT_APP_POST_TASK_DATA_URL: keys.REACT_APP_POST_TASK_DATA_URL,
}

export default config