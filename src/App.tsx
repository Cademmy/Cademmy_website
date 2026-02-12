import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Home from './pages/Home';
import CursosPresenciales from './pages/CursosPresenciales';
import CursosEnLinea from './pages/CursosEnLinea';
import Certificaciones from './pages/Certificaciones';
import CertificacionesIndiv from './pages/CertificacionesIndiv';
import CertificacionesEmpresas from './pages/CertificacionesEmpresas';
import Blog from './pages/Blog';
import Podcast from './pages/Podcast';
import CademmyTV from './pages/CademmyTV';
import MusicaIA from './pages/MusicaIA';
import KitsDinamicas from './pages/KitsDinamicas';
import Webinars from './pages/Webinars';
import PlaneadorDidacticoIA from './pages/PlaneadorDidacticoIA';
import Consultoria from './pages/Consultoria';
import AvisoPrivacidad from './pages/AvisoPrivacidad';
import IAMusicLab from './pages/IAMusicLab';
import Aula from './pages/Aula';
import LandingInstructor40 from './pages/LandingInstructor40';
import AdminDashboard from './pages/admin/AdminDashboard';
import BlogManager from './pages/admin/BlogManager';
import CourseManager from './pages/admin/CourseManager';
import LeadManager from './pages/admin/LeadManager';
import PodcastManager from './pages/admin/PodcastManager';
import MaterialManager from './pages/admin/MaterialManager';
import './App.css';

import { UserProvider } from './context/UserContext';
import MainLayout from './components/MainLayout';

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
                            <Route path="/cursos-presenciales" element={<CursosPresenciales />} />
                            <Route path="/cursos-en-linea" element={<CursosEnLinea />} />
                            <Route path="/certificaciones" element={<Certificaciones />} />
                            <Route path="/certificaciones/profesionales" element={<CertificacionesIndiv />} />
                            <Route path="/certificaciones/empresas" element={<CertificacionesEmpresas />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/cademmy-tv" element={<CademmyTV />} />
                            <Route path="/podcast" element={<Podcast />} />
                            <Route path="/recursos/musica-ia" element={<MusicaIA />} />
                            <Route path="/recursos/kits-dinamicas" element={<KitsDinamicas />} />
                            <Route path="/webinars" element={<Webinars />} />
                            <Route path="/ia/generador-canciones" element={<IAMusicLab />} />
                            <Route path="/ia/music-lab" element={<IAMusicLab />} />
                            <Route path="/ia/planeador-didactico" element={<PlaneadorDidacticoIA />} />
                            <Route path="/consultoria" element={<Consultoria />} />
                            <Route path="/aviso-privacidad" element={<AvisoPrivacidad />} />
                            <Route path="/aula/:courseId" element={<Aula />} />
                            <Route path="/instructor-4-0" element={<LandingInstructor40 />} />

                            {/* Admin Routes */}
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/admin/blog" element={<BlogManager />} />
                            <Route path="/admin/cursos" element={<CourseManager />} />
                            <Route path="/admin/leads" element={<LeadManager />} />
                            <Route path="/admin/podcast" element={<PodcastManager />} />
                            <Route path="/admin/materiales" element={<MaterialManager />} />
                            <Route path="*" element={<div style={{ padding: '5rem 2rem', textAlign: 'center' }}><h2>404 - Página no encontrada</h2></div>} />
                        </Routes>
                    </MainLayout>
                </Router>
            </UserProvider>
        </HelmetProvider>
    );
}

export default App;
