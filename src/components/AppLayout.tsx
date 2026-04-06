import React, { ReactNode } from 'react';
import { useUser } from '../context/UserContext';
import AppNavbar from './AppNavbar';
import Footer from './Footer';
import RewardToast from './RewardToast';

interface AppLayoutProps {
    children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const { userType, reward } = useUser();

    return (
        <div className={`app-container profile-${userType}`}>
            <AppNavbar />
            <main>
                {children}
            </main>
            <Footer />

            {reward && (
                <RewardToast
                    amount={reward.amount}
                    message={reward.message}
                    onClose={() => { }} 
                />
            )}
        </div>
    );
};

export default AppLayout;
