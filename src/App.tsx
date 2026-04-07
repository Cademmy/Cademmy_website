import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Home from './pages/Home';
import CursosEnLinea from './pages/CursosEnLinea';
import Blog from './pages/Blog';
import Podcast from './pages/Podcast';
import CademmyTV from './pages/CademmyTV';
import KitsDinamicas from './pages/KitsDinamicas';
import Consultoria from './pages/Consultoria';
import AvisoPrivacidad from './pages/AvisoPrivacidad';
import IAMusicLab from './pages/IAMusicLab';
import Aula from './pages/Aula';
import LandingProfesionales from './pages/LandingProfesionales';
import CourseLandingPage from './pages/CourseLandingPage';
import DiagnosticoRH from './pages/DiagnosticoRH';
import LandingEmpresas from './pages/LandingEmpresas';
import PlaneadorDidacticoIA from './pages/PlaneadorDidacticoIA';
import LandingInstructor40 from './pages/LandingInstructor40';
import Webinars from './pages/Webinars';
import AdminDashboard from './pages/admin/AdminDashboard';
import BlogManager from './pages/admin/BlogManager';
import CourseManager from './pages/admin/CourseManager';
import CourseEditor from './pages/admin/CourseEditor';
import LeadManager from './pages/admin/LeadManager';
import PodcastManager from './pages/admin/PodcastManager';
import MaterialManager from './pages/admin/MaterialManager';
import './App.css';

import { UserProvider } from './context/UserContext';
import PublicLayout from './components/PublicLayout';
import AppLayout from './components/AppLayout';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <HelmetProvider>
            <UserProvider>
                <Router>
                    <Helmet>
                        <title>Cademmy | Educación 5.0</title>
                        <meta name="description" content="Liderando la vanguardia educativa con IA y Neuro-aprendizaje." />
                    </Helmet>

                    <Routes>
                        {/* === Public Routes === */}
                        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
                        <Route path="/aprendizaje" element={<PublicLayout><CursosEnLinea /></PublicLayout>} />
                        <Route path="/certificacion" element={<PublicLayout><LandingProfesionales /></PublicLayout>} />
                        <Route path="/formador-4-0" element={<PublicLayout><LandingInstructor40 /></PublicLayout>} />
                        <Route path="/consultoria" element={<PublicLayout><Consultoria /></PublicLayout>} />
                        <Route path="/empresas" element={<PublicLayout><LandingEmpresas /></PublicLayout>} />


                        {/* IA Lab & Recursos */}
                        <Route path="/ia-lab" element={<PublicLayout><IAMusicLab /></PublicLayout>} />
                        <Route path="/diagnostico-rh" element={<PublicLayout><DiagnosticoRH /></PublicLayout>} />

                        <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
                        <Route path="/cademmy-tv" element={<PublicLayout><CademmyTV /></PublicLayout>} />
                        <Route path="/podcast" element={<PublicLayout><Podcast /></PublicLayout>} />
                        <Route path="/recursos" element={<PublicLayout><KitsDinamicas /></PublicLayout>} />
                        <Route path="/creador-objetivos" element={<PublicLayout><PlaneadorDidacticoIA /></PublicLayout>} />
                        <Route path="/webinars" element={<PublicLayout><Webinars /></PublicLayout>} />
                        <Route path="/contacto" element={<PublicLayout><div style={{ padding: '8rem 2rem', textAlign: 'center' }}><h2>Sección de Contacto (En construcción)</h2></div></PublicLayout>} />

                        <Route path="/aviso-privacidad" element={<PublicLayout><AvisoPrivacidad /></PublicLayout>} />
                        <Route path="/curso/:courseId" element={<PublicLayout><CourseLandingPage /></PublicLayout>} />

                        {/* Legacy Aliases */}
                        <Route path="/instructor-4-0" element={<PublicLayout><LandingInstructor40 /></PublicLayout>} />

                        {/* === App Routes === */}
                        <Route path="/aula" element={<AppLayout><div style={{ padding: '5rem 2rem', textAlign: 'center' }}><h2>Mi Panel (Próximamente)</h2><p>Selecciona un curso de aprendizaje.</p></div></AppLayout>} />
                        <Route path="/aula/:courseId" element={<AppLayout><Aula /></AppLayout>} />

                        {/* Admin Routes - Protegidas */}
                        <Route path="/admin" element={<ProtectedRoute requireAdmin><AppLayout><AdminDashboard /></AppLayout></ProtectedRoute>} />
                        <Route path="/admin/blog" element={<ProtectedRoute requireAdmin><AppLayout><BlogManager /></AppLayout></ProtectedRoute>} />
                        <Route path="/admin/cursos" element={<ProtectedRoute requireAdmin><AppLayout><CourseManager /></AppLayout></ProtectedRoute>} />
                        <Route path="/admin/cursos/:courseId/edit" element={<ProtectedRoute requireAdmin><AppLayout><CourseEditor /></AppLayout></ProtectedRoute>} />
                        <Route path="/admin/leads" element={<ProtectedRoute requireAdmin><AppLayout><LeadManager /></AppLayout></ProtectedRoute>} />
                        <Route path="/admin/podcast" element={<ProtectedRoute requireAdmin><AppLayout><PodcastManager /></AppLayout></ProtectedRoute>} />
                        <Route path="/admin/materiales" element={<ProtectedRoute requireAdmin><AppLayout><MaterialManager /></AppLayout></ProtectedRoute>} />
                        
                        <Route path="*" element={<PublicLayout><div style={{ padding: '5rem 2rem', textAlign: 'center' }}><h2>404 - Página no encontrada</h2></div></PublicLayout>} />
                    </Routes>
                </Router>
            </UserProvider>
        </HelmetProvider>
    );
}

export default App;
