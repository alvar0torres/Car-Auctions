import { useContext, createContext, useState, useEffect } from "react";

import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (data) => {
            setUserData(data);
        });
        return () => unsubscribe();
    }, [userData, logIn, logOut])

    return (
        <AuthContext.Provider value={{ userData, logIn, logOut }}>{children}</AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}