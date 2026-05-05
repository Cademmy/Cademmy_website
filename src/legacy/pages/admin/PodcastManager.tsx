import React, { useState } from 'react';
import './Admin.css';

const PodcastManager: React.FC = () => {
    const [episodes] = useState([
        { id: 1, title: 'Ep 01: El Cerebro al Aprender', duration: '45:00', status: 'published' },
        { id: 2, title: 'Ep 02: IA y el Futuro RH', duration: '38:15', status: 'draft' },
    ]);

    return (
        <div className="manager-container container">
            <header className="manager-header">
                <h2>Gestión de Podcast (Neuro-Educación)</h2>
                <button className="cta-button brand-gradient">Nuevo Episodio +</button>
            </header>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Duración</th>
                        <th>Estatus</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {episodes.map(track => (
                        <tr key={track.id}>
                            <td>{track.title}</td>
                            <td>{track.duration}</td>
                            <td>
                                <span className={`item-badge badge-${track.status}`}>
                                    {track.status === 'published' ? 'Publicado' : 'Borrador'}
                                </span>
                            </td>
                            <td>
                                <button className="mini-btn">Editar Audio</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PodcastManager;
