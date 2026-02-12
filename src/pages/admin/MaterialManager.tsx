import React, { useState } from 'react';
import './Admin.css';

const MaterialManager: React.FC = () => {
    const [materials] = useState([
        { id: 1, name: 'Guía de Estandarización EC0217', type: 'PDF', coins: 150 },
        { id: 2, name: 'Checklist Auditable RH', type: 'Excel', coins: 200 },
    ]);

    return (
        <div className="manager-container container">
            <header className="manager-header">
                <h2>Repositorio de Materiales (Canjeables)</h2>
                <button className="cta-button brand-gradient">Subir Material +</button>
            </header>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Nombre del Recurso</th>
                        <th>Tipo</th>
                        <th>Costo (CAD-Coins)</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {materials.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.type}</td>
                            <td>🪙 {item.coins}</td>
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

export default MaterialManager;
