import React, { useState } from 'react';
import './Admin.css';

const CourseManager: React.FC = () => {
    const [courses] = useState([
        { id: 1, title: 'Formador 4.0 Pro', type: 'Online', videos: 12, status: 'active' },
        { id: 2, title: 'Neuro-aprendizaje B2B', type: 'Presencial', videos: 0, status: 'active' },
    ]);

    return (
        <div className="manager-container container">
            <header className="manager-header">
                <h2>Gestión de Cursos</h2>
                <button className="cta-button brand-gradient">Cargar Nuevo Curso +</button>
            </header>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Nombre del Curso</th>
                        <th>Tipo</th>
                        <th>Videos</th>
                        <th>Estatus</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <tr key={course.id}>
                            <td>{course.title}</td>
                            <td>{course.type}</td>
                            <td>{course.videos}</td>
                            <td>
                                <span className={`item-badge badge-published`}>Activo</span>
                            </td>
                            <td>
                                <button className="mini-btn">Gestionar Videos</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseManager;
