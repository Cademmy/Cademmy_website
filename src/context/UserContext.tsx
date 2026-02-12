import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

export type UserType = 'professional' | 'company' | 'none';

interface UserContextType {
    user: User | null;
    userData: any | null;
    userType: UserType;
    setUserType: (type: UserType) => void;
    loading: boolean;
    reward: { amount: number; message: string } | null;
    triggerReward: (amount: number, message: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [reward, setReward] = useState<{ amount: number; message: string } | null>(null);
    const [userType, setUserTypeState] = useState<UserType>(() => {
        const saved = localStorage.getItem('cademmy_user_profile');
        return (saved as UserType) || 'none';
    });

    const triggerReward = (amount: number, message: string) => {
        setReward({ amount, message });
        setTimeout(() => setReward(null), 5000);
    };

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                const userRef = doc(db, 'users', currentUser.uid);
                const unsubscribeData = onSnapshot(userRef, (doc) => {
                    if (doc.exists()) {
                        setUserData(doc.data());
                    }
                });
                return () => unsubscribeData();
            } else {
                setUserData(null);
            }
            setLoading(false);
        });

        return () => unsubscribeAuth();
    }, []);

    const setUserType = (type: UserType) => {
        setUserTypeState(type);
        localStorage.setItem('cademmy_user_profile', type);
    };

    return (
        <UserContext.Provider value={{
            user,
            userData,
            userType,
            setUserType,
            loading,
            reward,
            triggerReward
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
