import React, { useState, useRef, useEffect } from 'react';
import './AIChat.css';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

const AIChat: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "¡Hola! Soy el asistente de IA de Cademmy. ¿En qué puedo ayudarte hoy con nuestras certificaciones?",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [userProfile, setUserProfile] = useState<'pro' | 'empresa' | null>(null);
    const [lastStandard, setLastStandard] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            text: input,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');

        // Fase 1: Pensando
        setIsTyping(true);

        // Fase 2: Buscando en la web (simulado de alto nivel)
        setTimeout(() => {
            setIsSearching(true);

            setTimeout(() => {
                setIsSearching(false);
                // Fase 3: Escribiendo respuesta final
                const aiResponse = generateAIResponse(currentInput);
                const aiMessage: Message = {
                    id: Date.now() + 1,
                    text: aiResponse,
                    sender: 'ai',
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, aiMessage]);
                setIsTyping(false);
            }, 2500); // Tiempo de "búsqueda"
        }, 800);
    };

    const generateAIResponse = (query: string): string => {
        const cleanQuery = query.toLowerCase()
            .replace(/\s+/g, '')
            .replace(/eco/g, 'ec0')
            .replace(/ec-/g, 'ec')
            .replace(/[\.\-]/g, '');

        // 1. Detección de Perfil
        if (!userProfile) {
            // Detección por número o texto
            if (cleanQuery === '2' || cleanQuery.includes('empresa') || cleanQuery.includes('equipo') || cleanQuery.includes('negocio')) {
                setUserProfile('empresa');
                return "¡Entendido! Como empresa, sus objetivos son diferentes. ¿Sobre qué estándar les gustaría recibir consultoría para su equipo hoy?";
            }
            if (cleanQuery === '1' || cleanQuery.includes('profe') || cleanQuery.includes('independiente') || cleanQuery.includes('yo')) {
                setUserProfile('pro');
                return "Excelente, un profesional buscando crecer. ¿En qué estándar te gustaría especializarte para impulsar tu carrera hoy?";
            }

            // Si pregunta por un estándar directo sin perfil o cualquier otra cosa al inicio
            return `Con gusto te asesoro. Pero antes, para darte la mejor información: ¿nos contactas como:\n\n1. Profesional independiente\n2. Empresa / Equipo\n\nResponde con el número o la opción.`;
        }


        // 3. Manejo de Respuestas Afirmativas (Si el usuario dice "sí", "claro", "temario")
        const affirmative = cleanQuery === 'si' || cleanQuery === 'claro' || cleanQuery.includes('temario') || cleanQuery.includes('masinfo');

        if (affirmative && lastStandard) {
            const syllabus = {
                ec0301: "El temario del EC0301 incluye: \n1. Planificación del diseño del curso.\n2. Diseño de instrumentos de evaluación.\n3. Desarrollo de manuales del curso.\n¡Es el proceso más completo para diseñadores!",
                ec0217: "El temario del EC0217.01 incluye: \n1. Preparación de la sesión de capacitación.\n2. Conducción de la sesión (Técnicas instruccionales).\n3. Evaluación del aprendizaje y del curso.\nIdeal para dominar el escenario.",
                ec0366: "El temario del EC0366 incluye: \n1. Planificación del curso en línea.\n2. Desarrollo de contenidos y materiales multimedia.\n3. Verificación y montaje en plataforma.\nTodo lo que necesitas para el mundo digital."
            };
            return `${syllabus[lastStandard as keyof typeof syllabus]} ¿Te gustaría que te enviemos este temario por PDF a tu correo o prefieres agendar una cita rápida con un asesor?`;
        }

        // 2. Base de Conocimiento con respuestas diferenciadas (Alineado con Mariana, Buyer Persona RH)
        const getStandardResponse = (std: string) => {
            const data = {
                ec0301: {
                    title: "Diseño de Cursos (EC0301)",
                    pro: "El EC0301 es el referente nacional para que tú diseñes cursos con estándares internacionales. Aprenderás a crear cartas descriptivas e instrumentos de evaluación profesionales. Al certificarte, podrás asegurar que tus capacitaciones sean didácticamente perfectas.",
                    empresa: "Mariana, el EC0301 es la solución para eliminar la falta de instrumentos y trazabilidad en su capacitación. Al certificar a sus diseñadores internos, asegurarán que cada curso cuente con manuales y evidencias sólidas, permitiendo estandarizar la formación y reducir la variabilidad que hoy afecta su operación ante auditorías."
                },
                ec0217: {
                    title: "Impartición de Cursos (EC0217.01)",
                    pro: "El EC0217.01 certifica tu excelencia frente a grupo. Te da las herramientas para dominar el escenario y evaluar el aprendizaje profesionalmente. Ganarás autoridad inmediata y un manejo de grupo de nivel experto.",
                    empresa: "Entendemos que a veces tienen instructores expertos pero sin metodología, lo que genera una baja transferencia al puesto. El EC0217.01 profesionaliza a sus instructores internos, dándoles la técnica para que el conocimiento realmente se aplique en la operación y se reduzcan incidentes o mermas por falta de capacitación efectiva."
                },
                ec0366: {
                    title: "Desarrollo de Cursos en Línea (EC0366)",
                    pro: "El EC0366 es tu pase al mundo digital. Podrás lanzar tu propia academia online con el respaldo de la SEP, planificando contenidos multimedia y montándolos en plataformas LMS de forma profesional.",
                    empresa: "Para enfrentar desafíos de rotación constante y crecimiento rápido, el EC0366 les permite digitalizar su know-how corporativo. Al certificar a su equipo, garantizan que su capacitación online sea escalable e interactiva, manteniendo la consistencia en el entrenamiento de miles de empleados de forma automática."
                }
            };

            const stdData = data[std as keyof typeof data];
            if (!stdData) return null;

            const mainText = userProfile === 'empresa' ? stdData.empresa : stdData.pro;
            const cta = userProfile === 'empresa'
                ? "¿Le gustaría recibir un paquete de certificación defendible ante Dirección que incluya acompañamiento y evidencias?"
                : "¿Te gustaría ver el temario completo o prefieres agendar una cita rápida?";

            return `${mainText} ${cta}`;
        };

        if (cleanQuery.includes('ec0301') || cleanQuery.includes('disenodecursos') || cleanQuery.includes('301')) {
            setLastStandard('ec0301');
            return getStandardResponse('ec0301') || "Lo siento, hubo un error al obtener la información del EC0301.";
        }
        if (cleanQuery.includes('ec0217') || cleanQuery.includes('imparticion') || cleanQuery.includes('217')) {
            setLastStandard('ec0217');
            return getStandardResponse('ec0217') || "Lo siento, hubo un error al obtener la información del EC0217.";
        }
        if (cleanQuery.includes('ec0366') || cleanQuery.includes('enlinea') || cleanQuery.includes('366')) {
            setLastStandard('ec0366');
            return getStandardResponse('ec0366') || "Lo siento, hubo un error al obtener la información del EC0366.";
        }

        // Respuestas de Negocio
        if (cleanQuery.includes('costo') || cleanQuery.includes('precio')) {
            return userProfile === 'empresa'
                ? "Para empresas manejamos paquetes especiales según el número de colaboradores. ¿De cuántas personas es su equipo?"
                : "La inversión para profesionales es de $5,000 MXN. Esto incluye todo tu proceso hasta la certificación oficial.";
        }

        return `Entiendo. Como ${userProfile === 'pro' ? 'profesional' : 'empresa'}, certificarse en estándares CONOCER les da el respaldo oficial de la SEP que necesitan. ¿Hay algún otro código o tema que les gustaría que investigara en este momento?`;
    };

    return (
        <div className={`ai-chat-container ${isOpen ? 'open' : ''}`}>
            {/* Botón Flotante */}
            <button className="ai-chat-toggle" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                ) : (
                    <div className="ai-toggle-content">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                        <span>Chat IA</span>
                    </div>
                )}
            </button>

            {/* Ventana de Chat */}
            <div className="ai-chat-window">
                <div className="ai-chat-header">
                    <div className="ai-avatar-mini">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 12L2.1 12.1"></path><path d="M12 12l9.9-0.1"></path><path d="M12 12V22"></path></svg>
                    </div>
                    <div className="ai-header-text">
                        <h4>Asistente Cademmy</h4>
                        <span className="online-status">En línea - IA</span>
                    </div>
                </div>

                <div className="ai-chat-messages">
                    {messages.map(msg => (
                        <div key={msg.id} className={`message-bubble ${msg.sender}`}>
                            {msg.text}
                        </div>
                    ))}
                    {isSearching && (
                        <div className="search-status">
                            <div className="search-loader"></div>
                            <span>Buscando en bases oficiales de CONOCER...</span>
                        </div>
                    )}
                    {isTyping && !isSearching && (
                        <div className="message-bubble ai typing">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="ai-chat-input-area">
                    <input
                        type="text"
                        placeholder="Escribe tu duda aquí..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button className="send-btn" onClick={handleSend}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIChat;
