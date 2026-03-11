import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminDashboard: React.FC = () => {
    return (
        <div className="admin-dashboard container">
            <header className="admin-header">
                <h1>Panel de Control Cademmy</h1>
                <p>Gestiona la plataforma, contenidos y leads B2B desde aquí.</p>
            </header>

            <div className="admin-grid">
                <Link to="/admin/blog" className="admin-card">
                    <span className="admin-icon">📝</span>
                    <h3>Gestión de Blog</h3>
                    <p>Redacta, edita y publica artículos para la comunidad.</p>
                </Link>

                <Link to="/admin/cursos" className="admin-card">
                    <span className="admin-icon">🎥</span>
                    <h3>Gestión de Cursos</h3>
                    <p>Sube nuevos videos y actualiza el catálogo de formación.</p>
                </Link>

                <Link to="/admin/leads" className="admin-card">
                    <span className="admin-icon">🤝</span>
                    <h3>Leads B2B / B2C</h3>
                    <p>Visualiza y exporta los contactos interesados captados.</p>
                </Link>

                <Link to="/admin/podcast" className="admin-card">
                    <span className="admin-icon">🎙️</span>
                    <h3>Neuro-Podcast</h3>
                    <p>Sube y gestiona episodios de formación en audio.</p>
                </Link>

                <Link to="/admin/materiales" className="admin-card">
                    <span className="admin-icon">📂</span>
                    <h3>Materiales y Canjes</h3>
                    <p>Gestiona los PDFs y herramientas canjeables por coins.</p>
                </Link>

                <div className="admin-card disabled">
                    <span className="admin-icon">⚙️</span>
                    <h3>Configuración</h3>
                    <p>Ajustes generales del sistema y métricas avanzadas.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
