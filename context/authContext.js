// import { createContext, useContext, useState, useEffect } from "react";
// import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
// import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
// import { auth, db } from "../firebase/firebase";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//     const [currentUser, setCurrentUser] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);

//     const clear = async () => {
//         try {
//             if (currentUser) {
//                 await updateDoc(doc(db, "users", currentUser?.uid), {
//                     isOnline: false,
//                 });
//             }
//             setCurrentUser(null);
//             setIsLoading(false);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const authStateChanged = async (user) => {
//         setIsLoading(true);
//         console.log(user);
//         if (!user) {
//             clear();
//             return;
//         }

//         const userDocExist = await getDoc(doc(db, "users", user.uid));
//         if (userDocExist.exists()) {
//             await updateDoc(doc(db, "users", user.uid), {
//                 isOnline: true,
//             });
//         }

//         const userDoc = await getDoc(doc(db, "users", user.uid));
       

//         setCurrentUser(userDoc.data());
//         setIsLoading(false);
//     };

//     const signOut = () => {
//         authSignOut(auth).then(() => clear());
//     };

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, authStateChanged);
//         return () => unsubscribe();
//     }, []);

//     return (
//         <UserContext.Provider
//             value={{ currentUser, setCurrentUser, isLoading, setIsLoading, signOut }}
//         >
//             {children}
//         </UserContext.Provider>
//     );
// };

// export const useAuth = () => useContext(UserContext);



import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [profileCreation, setProfileCreation] = useState(null)

    const clear = async () => {
        try {
            if (currentUser) {
                await updateDoc(doc(db, "users", currentUser?.uid), {
                    isOnline: false,
                });
            }
            setCurrentUser(null);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const authStateChanged = async (user) => {
        setIsLoading(true);
       
        if (!user) {
            clear();
            return;
        }

        const userDocExist = await getDoc(doc(db, "users", user.uid));
        if (userDocExist.exists()) {
            await updateDoc(doc(db, "users", user.uid), {
                isOnline: true,
            });
        }

        const userDoc = await getDoc(doc(db, "users", user.uid));
         setCurrentUser(userDoc.data());
        // console.log(userDoc);
        // setCurrentUser(user);
        setIsLoading(false);
    };

    const signOut = () => {
        authSignOut(auth).then(() => clear());
       
    };  

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, authStateChanged);
        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider
            value={{ currentUser, setCurrentUser, isLoading,setIsLoading, signOut, profileCreation, setProfileCreation }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => useContext(UserContext);
