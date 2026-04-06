import React, { ReactNode } from 'react';
import { useUser } from '../context/UserContext';
import PublicNavbar from './PublicNavbar';
import Footer from './Footer';
import AIChat from './AIChat';
import RewardToast from './RewardToast';
import AuthModal from './AuthModal';

interface PublicLayoutProps {
    children: ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
    const { userType, reward } = useUser();
    const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);

    React.useEffect(() => {
        (window as any).showAuthModal = () => setIsAuthModalOpen(true);
    }, []);

    return (
        <div className={`app-container profile-${userType}`}>
            <PublicNavbar />
            <main>
                {children}
            </main>
            <Footer />
            <AIChat />

            {reward && (
                <RewardToast
                    amount={reward.amount}
                    message={reward.message}
                    onClose={() => { }} 
                />
            )}

            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </div>
    );
};

export default PublicLayout;
