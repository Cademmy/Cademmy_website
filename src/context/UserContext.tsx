import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

export type UserType = 'professional' | 'company' | 'none';

interface UserContextType {
    user: User | null;
    userData: any | null;
    isAdmin: boolean;
    userType: UserType;
    setUserType: (type: UserType) => void;
    loading: boolean;
    reward: { amount: number; message: string } | null;
    triggerReward: (amount: number, message: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const ADMIN_EMAILS = ['gloria@cademmy.com', 'gloriaalbamx@gmail.com'];

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<any | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
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
                // Check if email is in hardcoded admin list
                const isEmailAdmin = currentUser.email ? ADMIN_EMAILS.includes(currentUser.email) : false;

                const userRef = doc(db, 'users', currentUser.uid);
                const unsubscribeData = onSnapshot(userRef, (doc) => {
                    if (doc.exists()) {
                        const data = doc.data();
                        setUserData(data);
                        setIsAdmin(isEmailAdmin || data.role === 'admin');
                    } else {
                        setIsAdmin(isEmailAdmin);
                    }
                    setLoading(false);
                }, (error) => {
                    console.error("Error fetching user data:", error);
                    setIsAdmin(isEmailAdmin);
                    setLoading(false);
                });
                return () => unsubscribeData();
            } else {
                setUserData(null);
                setIsAdmin(false);
                setLoading(false);
            }
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
            isAdmin,
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
