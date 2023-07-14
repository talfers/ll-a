import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLocalStorage } from '../hooks/useLocalStorage';


const ProtectedRoute = ({children}) => {
    const { user } = useAuth();
    const [visited] = useLocalStorage("visited", false);

    // console.log("VISSS", visited);
    if (visited || !visited) {
        if (!user) {
            return <Navigate to='/signin' />
        } else if (user.emailVerified===false) {
            return <Navigate to='/verifyemail' />
        } else {
            return children;
        }
    } else {
        return <Navigate to='/welcome' />
    }
    
}

export default ProtectedRoute;