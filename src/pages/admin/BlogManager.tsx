import React, { useState } from 'react';
import './Admin.css';

const BlogManager: React.FC = () => {
    const [posts] = useState([
        { id: 1, title: 'El Futuro de la IA en la Educación', author: 'Gloria Alba', status: 'published', date: '2026-01-20' },
        { id: 2, title: 'Cómo certificar a tu equipo RH', author: 'Admin', status: 'draft', date: '2026-01-25' },
    ]);

    return (
        <div className="manager-container container">
            <header className="manager-header">
                <h2>Gestión de Blog</h2>
                <button className="cta-button brand-gradient">Nuevo Artículo +</button>
            </header>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Fecha</th>
                        <th>Estatus</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                        <tr key={post.id}>
                            <td>{post.title}</td>
                            <td>{post.author}</td>
                            <td>{post.date}</td>
                            <td>
                                <span className={`item-badge badge-${post.status}`}>
                                    {post.status === 'published' ? 'Publicado' : 'Borrador'}
                                </span>
                            </td>
                            <td>
                                <button className="mini-btn">Editar</button>
                                <button className="mini-btn delete">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BlogManager;
