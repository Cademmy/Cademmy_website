import React, { ReactNode } from 'react';
import { useUser } from '../context/UserContext';
import Navbar from './Navbar';
import Footer from './Footer';
import AIChat from './AIChat';
import RewardToast from './RewardToast';
import AuthModal from './AuthModal';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const { userType, reward } = useUser();
    const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);

    React.useEffect(() => {
        (window as any).showAuthModal = () => setIsAuthModalOpen(true);
    }, []);

    return (
        <div className={`app-container profile-${userType}`}>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
            <AIChat />

            {reward && (
                <RewardToast
                    amount={reward.amount}
                    message={reward.message}
                    onClose={() => { }} // El context lo limpia por tiempo
                />
            )}

            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </div>
    );
};

export default MainLayout;
