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
import LandingInstructor40 from './pages/LandingInstructor40';
import CourseLandingPage from './pages/CourseLandingPage';
import DiagnosticoRH from './pages/DiagnosticoRH';
import AdminDashboard from './pages/admin/AdminDashboard';
import BlogManager from './pages/admin/BlogManager';
import CourseManager from './pages/admin/CourseManager';
import CourseEditor from './pages/admin/CourseEditor';
import LeadManager from './pages/admin/LeadManager';
import PodcastManager from './pages/admin/PodcastManager';
import MaterialManager from './pages/admin/MaterialManager';
import './App.css';

import { UserProvider } from './context/UserContext';
import MainLayout from './components/MainLayout';

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

                    <MainLayout>
                        <Routes>
                            <Route path="/" element={<Home />} />

                            {/* Unidades de Negocio */}
                            <Route path="/aprendizaje" element={<CursosEnLinea />} />
                            <Route path="/certificacion" element={<LandingInstructor40 />} />
                            <Route path="/consultoria" element={<Consultoria />} />

                            {/* IA Lab & Recursos */}
                            <Route path="/ia-lab" element={<IAMusicLab />} />
                            <Route path="/diagnostico-rh" element={<DiagnosticoRH />} />

                            <Route path="/blog" element={<Blog />} />
                            <Route path="/cademmy-tv" element={<CademmyTV />} />
                            <Route path="/podcast" element={<Podcast />} />
                            <Route path="/recursos" element={<KitsDinamicas />} />
                            <Route path="/contacto" element={<div style={{ padding: '8rem 2rem', textAlign: 'center' }}><h2>Sección de Contacto (En construcción)</h2></div>} />

                            <Route path="/aviso-privacidad" element={<AvisoPrivacidad />} />
                            <Route path="/aula/:courseId" element={<Aula />} />
                            <Route path="/curso/:courseId" element={<CourseLandingPage />} />

                            {/* Legacy Aliases (Redirecciones o rutas viejas mantenidas temporalmente si es necesario) */}
                            <Route path="/instructor-4-0" element={<LandingInstructor40 />} />

                            {/* Admin Routes - Protegidas */}
                            <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
                            <Route path="/admin/blog" element={<ProtectedRoute requireAdmin><BlogManager /></ProtectedRoute>} />
                            <Route path="/admin/cursos" element={<ProtectedRoute requireAdmin><CourseManager /></ProtectedRoute>} />
                            <Route path="/admin/cursos/:courseId/edit" element={<ProtectedRoute requireAdmin><CourseEditor /></ProtectedRoute>} />
                            <Route path="/admin/leads" element={<ProtectedRoute requireAdmin><LeadManager /></ProtectedRoute>} />
                            <Route path="/admin/podcast" element={<ProtectedRoute requireAdmin><PodcastManager /></ProtectedRoute>} />
                            <Route path="/admin/materiales" element={<ProtectedRoute requireAdmin><MaterialManager /></ProtectedRoute>} />
                            <Route path="*" element={<div style={{ padding: '5rem 2rem', textAlign: 'center' }}><h2>404 - Página no encontrada</h2></div>} />
                        </Routes>
                    </MainLayout>
                </Router>
            </UserProvider>
        </HelmetProvider>
    );
}

export default App;
