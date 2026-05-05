import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import './Admin.css';

const LeadManager: React.FC = () => {
    const [leads, setLeads] = useState<any[]>([]);

    useEffect(() => {
        const q = query(collection(db, 'leads_proyectos'), orderBy('createdAt', 'desc'), limit(50));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const leadsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setLeads(leadsData);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="manager-container container">
            <header className="manager-header">
                <h2>Leads Captados (B2B/B2C)</h2>
                <button className="cta-button outline-btn">Exportar CSV 📊</button>
            </header>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Cliente / Empresa</th>
                        <th>Tipo</th>
                        <th>Proyecto / Interés</th>
                        <th>Fecha</th>
                        <th>Estatus</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map(lead => (
                        <tr key={lead.id}>
                            <td>
                                <div><strong>{lead.userName || 'Anónimo'}</strong></div>
                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{lead.userEmail || '-'}</div>
                            </td>
                            <td>
                                <span className="item-badge" style={{ background: lead.userType === 'company' ? '#e0f2fe' : '#f1f5f9', color: lead.userType === 'company' ? '#0369a1' : '#475569' }}>
                                    {lead.userType === 'company' ? 'B2B' : 'B2C'}
                                </span>
                            </td>
                            <td>{lead.project?.title || 'Interés General'}</td>
                            <td>{lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString() : 'Reciente'}</td>
                            <td>
                                <span className="item-badge" style={{ background: '#fef3c7', color: '#92400e' }}>Pendiente</span>
                            </td>
                        </tr>
                    ))}
                    {leads.length === 0 && (
                        <tr>
                            <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>No hay leads registrados aún.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LeadManager;
