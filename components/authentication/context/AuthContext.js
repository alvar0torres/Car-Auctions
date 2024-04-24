import { useContext, createContext, useState, useEffect } from "react";

import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        return signOut(auth);
    };

    useEffect(() => {
        onAuthStateChanged(auth, (data) => {
            if (data) {
                setUserData(data);
                setIsLoggedIn(true);
            } else {
                setUserData(null);
                setIsLoggedIn(false);
            }
        })
    }, []);

    return (
        <AuthContext.Provider value={{ userData, logIn, logOut, isLoggedIn }}>{children}</AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}