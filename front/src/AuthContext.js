import React from 'react';

export const AuthContext = React.createContext({
    userEmail: null,
    signIn: undefined,
    signOut: undefined
});