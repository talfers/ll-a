import { useState, useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import Welcome from '../components/Welcome';
import Home from '../components/Home';
import Profile from '../components/Profile';
import ThankYou from '../components/ThankYou';
import VerifyEmail from '../components/VerifyEmail';
import ResetPassword from '../components/ResetPassword';
import ResetPasswordMessage from '../components/ResetPasswordMessage';
import Tabs from '../components/Tabs';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import RedirectRoute from '../components/RedirectRoute';
import { Context as TaskContext } from '../context/TaskContext';
import { useAuth } from '../hooks/useAuth';
import { usePayments } from '../hooks/usePayments';
import { useTabs } from '../hooks/useTabs';
import Response from '../components/Response';


function MainPage({handleThemeChange}) {
    const { user, logOut } = useAuth();
    const {state} = useContext(TaskContext)
    const [ activeTabId, activeTab, setActiveTab] = useTabs(state.tabs)
    const { getCurrentPlan, getCustomer, getProducts } = usePayments();
    const [subscription, setSubscription] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [plans, setPlans] = useState([])
    const [selectedPlan, setSelectedPlan] = useState('');
    

    useEffect(() => {
        if(user?.uid){
            const getDetails = async () => {
                let cust = await getCustomer(user?.uid);
                let sub = await getCurrentPlan(user?.uid);
                setSubscription(sub)
                setCustomer(cust)
            }
            getDetails()
        } else {
            return
        }
        
    }, [user?.uid, getCurrentPlan, user?.email, getCustomer])

    useEffect(() => {
        const fetchProducts = async () => {
            let products = await getProducts();
            setPlans(products)
            setSelectedPlan(products[0].prices.priceId)
        }
        fetchProducts()
    }, [getProducts])
  
    return (
        <div>
            <Header 
                user={user}
                tabs={state.tabs} 
                setActiveTab={setActiveTab} 
                activeTabId={activeTabId} 
                logOut={logOut} 
                handleThemeChange={handleThemeChange} 
            />
            <Routes>
                <Route path="/signin" element={<RedirectRoute><SignIn/></RedirectRoute>} />
                <Route path="/signup" element={<RedirectRoute><SignUp plans={plans} selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan}/></RedirectRoute>} />
                <Route path="/welcome" element={<Welcome/>} />
                <Route path="/reset" element={<ResetPassword/>} />
                <Route path="/resetsent" element={<ResetPasswordMessage/>} />
                <Route path="/thankyou" element={<RedirectRoute><ThankYou/></RedirectRoute>}/>
                <Route path="/verifyemail" element={<RedirectRoute><VerifyEmail/></RedirectRoute>}/>
                <Route path="/" element={<ProtectedRoute> <Home user={user} tabs={state.tabs} setActiveTab={setActiveTab}/></ProtectedRoute>} />
                <Route path="/assistant" element={<ProtectedRoute><Tabs plans={plans} selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} activeTab={activeTab} customer={customer} subscription={subscription}/></ProtectedRoute>} />
                <Route path="/response" element={<ProtectedRoute><Response plans={plans} selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} tab={activeTab} customer={customer} subscription={subscription}/></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile plans={plans} selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan}/></ProtectedRoute>} />
            </Routes>
            <Footer/>
        </div>
    )   
}

export default MainPage; 