import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NeuroPlayer from '../components/NeuroPlayer';
import SimuladorIA from '../components/SimuladorIA';
import EvidenceBuilder from '../components/EvidenceBuilder';
import QuizPlayer from '../components/QuizPlayer';
import InteractiveMatch from '../components/InteractiveMatch';
import ARVRPlaceholder from '../components/ARVRPlaceholder';
import PDFReader from '../components/PDFReader';
import NeuroCoachWidget from '../components/NeuroCoachWidget';
import { LMSService, Course, Lesson } from '../services/lmsService';
import { useUser } from '../context/UserContext';
import './Aula.css';

const Aula: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const { user } = useUser();
    const [course, setCourse] = useState<Course | null>(null);
    const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
    const [progress, setProgress] = useState<any>({ completedLessons: {}, performanceMetrics: {} });

    useEffect(() => {
        const load = async () => {
            if (!courseId) return;

            try {
                const realCourse = await LMSService.getCourseData(courseId);
                if (realCourse) {
                    setCourse(realCourse);
                    setActiveLesson(realCourse.lessons[0]);
                } else {
                    // Fallback to mock only if not found
                    const mockCourse: Course = {
                        id: 'ec0217',
                        title: 'Certificación EC0217.01 - Impartición de Cursos (Mock)',
                        lessons: [
                            { id: 'l1', title: 'Introducción al Neuro-aprendizaje', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '10:00', asset_type: 'video' },
                        ]
                    };
                    setCourse(mockCourse);
                    setActiveLesson(mockCourse.lessons[0]);
                }
            } catch (error) {
                console.error("Error loading course:", error);
            }

            if (user && courseId) {
                const prog = await LMSService.getUserProgress(user.uid, courseId);
                setProgress(prog);
            }
        };
        load();
    }, [courseId, user]);

    const handleComplete = async (performance?: any) => {
        if (user && activeLesson) {
            await LMSService.completeLesson(user.uid, courseId || 'ec0217', activeLesson.id, performance);
            setProgress((prev: any) => ({
                ...prev,
                completedLessons: { ...prev.completedLessons, [activeLesson.id]: true },
                performanceMetrics: { ...prev.performanceMetrics, [activeLesson.id]: performance || {} }
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
            case 'quiz':
                return <QuizPlayer
                    questions={activeLesson.questions || []}
                    onComplete={(score) => handleComplete({ score: (score / (activeLesson.questions?.length || 1)) * 100 })}
                />;
            case 'interactive':
                return <InteractiveMatch
                    pairs={activeLesson.pairs || []}
                    onComplete={() => handleComplete({ score: 100 })}
                />;
            case 'ar_vr':
                return <ARVRPlaceholder
                    title={activeLesson.title}
                    instructions={activeLesson.instructions}
                    externalLink={activeLesson.external_link}
                />;
            case 'reading':
                return <PDFReader
                    url={activeLesson.pdfUrl || ''}
                    onComplete={() => handleComplete({ score: 100 })}
                />;
            case 'video':
            default:
                return (
                    <NeuroPlayer
                        videoUrl={activeLesson.videoUrl || ''}
                        title={activeLesson.title}
                        onCompleted={() => handleComplete()}
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
                                {progress.completedLessons?.[lesson.id] ? '✅' : '🔴'}
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

            <NeuroCoachWidget
                progress={progress}
                currentLesson={activeLesson}
            />
        </div>
    );
};

export default Aula;
