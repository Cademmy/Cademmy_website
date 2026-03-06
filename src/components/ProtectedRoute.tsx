import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
    const { user, isAdmin, loading } = useUser();
    const location = useLocation();

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                <div className="spinner"></div>
                <p>Verificando credenciales...</p>
            </div>
        );
    }

    if (!user) {
        // Redirigir al home si no está logueado
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    if (requireAdmin && !isAdmin) {
        // Redirigir al home si no es admin
        console.warn("Acceso denegado: Se requiere rol de administrador.");
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
