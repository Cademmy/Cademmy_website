import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist';
// @ts-ignore
import mammoth from 'mammoth';
import { CourseScannerService, CourseDraft } from '../../services/courseScannerService';
import { LMSService } from '../../services/lmsService';
import CourseDraftReview from '../../components/CourseDraftReview';
import './Admin.css';

// IMPORTANTE: Esta es la forma correcta de cargar el worker en Vite para evitar errores de red externos
// @ts-ignore
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const CourseManager: React.FC = () => {
    const navigate = useNavigate();
    const [courses] = useState([
        { id: 'ec0217', title: 'Formador 4.0 Pro', type: 'Online', units: 15, status: 'active' },
        { id: 'neuro-b2b', title: 'Neuro-aprendizaje B2B', type: 'Presencial', units: 8, status: 'active' },
    ]);

    const [scanning, setScanning] = useState(false);
    const [draft, setDraft] = useState<CourseDraft | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Eliminamos el useEffect que causaba el error de pdfWorker no definido

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setScanning(true);
        try {
            let text = '';
            if (file.type === 'application/pdf') {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const content = await page.getTextContent();
                    // Intentar agrupar por líneas basándose en la posición Y
                    let lastY = -1;
                    let pageText = '';
                    content.items.forEach((item: any) => {
                        if (lastY !== -1 && Math.abs(item.transform[5] - lastY) > 5) {
                            pageText += '\n';
                        }
                        pageText += item.str + ' ';
                        lastY = item.transform[5];
                    });
                    text += pageText + '\n---\n'; // Separador de página
                }
            } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                const arrayBuffer = await file.arrayBuffer();
                const result = await mammoth.extractRawText({ arrayBuffer });
                text = result.value;
            } else {
                throw new Error("Formato no soportado. Usa PDF o DOCX.");
            }

            console.log("Extracted Text Length:", text.length);
            console.log("Extracted Text Preview:", text.substring(0, 200));

            const courseDraft = await CourseScannerService.analyzeCurriculum(text);
            setDraft(courseDraft);
        } catch (error: any) {
            console.error(error);
            alert("Error al procesar el archivo: " + error.message);
        } finally {
            setScanning(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const confirmDraft = async () => {
        if (!draft) return;
        try {
            const courseId = await LMSService.createCourseFromDraft(draft);
            setDraft(null);
            navigate(`/admin/cursos/${courseId}/edit`);
        } catch (error: any) {
            alert("Error al crear el curso: " + error.message);
        }
    };

    return (
        <div className="manager-container container">
            <header className="manager-header">
                <h2>Gestión de Cursos 5.0</h2>
                <div className="header-actions">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                        accept=".pdf,.docx"
                    />
                    <button
                        className="mini-btn secondary"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={scanning}
                    >
                        {scanning ? 'Analizando...' : '📄 Importar desde Documento'}
                    </button>
                    <button className="cta-button brand-gradient">Cargar Nuevo Curso +</button>
                </div>
            </header>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Nombre del Curso</th>
                        <th>Tipo</th>
                        <th>Unidades de Contenido</th>
                        <th>Estatus</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <tr key={course.id}>
                            <td>{course.title}</td>
                            <td>{course.type}</td>
                            <td>{course.units} unidades</td>
                            <td>
                                <span className="item-badge badge-published">Activo</span>
                            </td>
                            <td>
                                <div className="action-buttons-cell">
                                    <Link to={`/admin/cursos/${course.id}/edit`} className="mini-btn text-center">Gestionar</Link>
                                    <Link to={`/curso/${course.id}`} className="mini-btn secondary text-center" target="_blank">Ver Landing 👁️</Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {draft && (
                <CourseDraftReview
                    draft={draft}
                    onConfirm={confirmDraft}
                    onCancel={() => setDraft(null)}
                />
            )}
        </div>
    );
};

export default CourseManager;
