import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NeuroPlayer from '../components/NeuroPlayer';
import SimuladorIA from '../components/SimuladorIA';
import EvidenceBuilder from '../components/EvidenceBuilder';
import { LMSService, Course, Lesson } from '../services/lmsService';
import { useUser } from '../context/UserContext';
import './Aula.css';

const Aula: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const { user } = useUser();
    const [course, setCourse] = useState<Course | null>(null);
    const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
    const [progress, setProgress] = useState<any>({ completedLessons: {} });

    useEffect(() => {
        const load = async () => {
            // Mock data for Alumno Demo if courseId is ec0217
            const mockCourse: Course = {
                id: 'ec0217',
                title: 'Certificación EC0217.01 - Impartición de Cursos',
                lessons: [
                    { id: 'l1', title: 'Introducción al Neuro-aprendizaje', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '10:00', asset_type: 'video' },
                    { id: 'l2', title: 'Técnicas Instruccionales de Alto Impacto', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '15:20', asset_type: 'video' },
                    { id: 'l3', title: 'Manejo de Grupos Difíciles', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '12:45', asset_type: 'video' },
                    { id: 'm6', title: 'Módulo 6: Construcción de Portafolio', videoUrl: '', duration: 'Taller', asset_type: 'portfolio' },
                    { id: 'm7', title: 'Módulo 7: Simulador de Evaluación', videoUrl: '', duration: 'Interactivo', asset_type: 'simulator' }
                ]
            };

            setCourse(mockCourse);
            setActiveLesson(mockCourse.lessons[0]);

            if (user) {
                const prog = await LMSService.getUserProgress(user.uid, courseId || 'ec0217');
                setProgress(prog);
            }
        };
        load();
    }, [courseId, user]);

    const handleComplete = async () => {
        if (user && activeLesson) {
            await LMSService.completeLesson(user.uid, courseId || 'ec0217', activeLesson.id);
            setProgress((prev: any) => ({
                ...prev,
                completedLessons: { ...prev.completedLessons, [activeLesson.id]: true }
            }));
            alert("¡Lección completada! +25 CAD-Coins");
        }
    };

    if (!course || !activeLesson) return <div className="loading-aula">Cargando tu aula virtual...</div>;

    const renderContent = () => {
        switch (activeLesson.asset_type) {
            case 'portfolio':
                return <EvidenceBuilder />;
            case 'simulator':
                return <SimuladorIA />;
            case 'video':
            default:
                return (
                    <NeuroPlayer
                        videoUrl={activeLesson.videoUrl}
                        title={activeLesson.title}
                        onCompleted={handleComplete}
                    />
                );
        }
    };

    return (
        <div className="aula-layout">
            <aside className="aula-sidebar">
                <div className="sidebar-header">
                    <h2>Aula Cademmy</h2>
                    <p>{course.title}</p>
                </div>
                <div className="lesson-list">
                    {course.lessons.map(lesson => (
                        <div
                            key={lesson.id}
                            className={`lesson-item ${activeLesson.id === lesson.id ? 'active' : ''}`}
                            onClick={() => setActiveLesson(lesson)}
                        >
                            <span className="lesson-status">
                                {progress.completedLessons[lesson.id] ? '✅' : '🔴'}
                            </span>
                            <div className="lesson-info">
                                <h4>{lesson.title}</h4>
                                <span>{lesson.duration}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            <main className="aula-main">
                <div className="aula-content-header">
                    <h1>{activeLesson.title}</h1>
                </div>
                {renderContent()}
            </main>
        </div>
    );
};

export default Aula;
