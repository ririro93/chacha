import React from 'react';

export const AppContext = React.createContext({
    userEmail: null,
    signIn: () => {},
    signOut: () => {},
    signUp: () => {},
    setIsSignInModalVisible: () => {},
    setIsSignUpModalVisible: () => {},
    isSignInModalVisible: false,
    isSignUpModalVisible: false
});