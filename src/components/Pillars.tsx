import { useUser } from '../context/UserContext';

const Pillars: React.FC = () => {
    const { userType } = useUser();

    const getPillars = () => {
        const basePillars = [
            {
                id: 'cert',
                title: 'Certificaciones',
                description: userType === 'company'
                    ? 'Estandariza tu fuerza laboral con certificaciones CONOCER y FGU para equipos de alto desempeño.'
                    : 'Valida tu experiencia con estándares CONOCER y certificaciones internacionales FGU.',
                icon: '📜'
            },
            {
                id: 'consult',
                title: userType === 'company' ? 'Consultoría Estratégica' : 'Consultoría B2B',
                description: userType === 'company'
                    ? 'Optimización de procesos pedagógicos y ROI en capacitación para tu empresa.'
                    : 'Soluciones estratégicas para capital humano y desarrollo profesional en la era 4.0.',
                icon: '🤝'
            },
            {
                id: 'vr',
                title: 'Cursos VR',
                description: 'Experiencias de aprendizaje inmersivo con Realidad Virtual de última generación.',
                icon: '🥽'
            }
        ];

        return basePillars;
    };

    const currentPillars = getPillars();

    return (
        <section key={userType} className={`pillars-section profile-${userType}`}>
            <div className="section-header">
                <h2>{userType === 'company' ? 'Soluciones Corporativas' : 'Nuestros Pilares'}</h2>
                <p>
                    {userType === 'company'
                        ? 'Servicios diseñados para elevar la competitividad de tu organización.'
                        : 'Soluciones integrales para la formación del futuro.'}
                </p>
            </div>
            <div className="pillars-grid animate-fade-in">
                {currentPillars.map((p) => (
                    <div key={p.id} className="pillar-card">
                        <div className="pillar-icon">{p.icon}</div>
                        <h3>{p.title}</h3>
                        <p>{p.description}</p>
                        <button className="learn-more">Saber más &rarr;</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Pillars;
