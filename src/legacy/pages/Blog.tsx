import React, { useState } from 'react';
import './Blog.css';

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    category: 'IA' | 'Educación' | 'Empresas';
    date: string;
    readTime: string;
    image: string;
}

const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "Cómo la IA está transformando la certificación de competencias en 2026",
        excerpt: "Descubre cómo las herramientas de inteligencia artificial están agilizando los procesos de evaluación y mejorando la precisión pedagógica.",
        category: 'IA',
        date: "15 Ene, 2026",
        readTime: "5 min",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        title: "El ROI de la capacitación: Por qué certificar a tu equipo ahorra miles de dólares",
        excerpt: "Análisis profundo sobre el impacto financiero de tener personal estandarizado y certificado bajo normas oficiales.",
        category: 'Empresas',
        date: "12 Ene, 2026",
        readTime: "8 min",
        image: "https://images.unsplash.com/photo-1454165833767-1396e54612d8?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        title: "5 Estándares de Competencia que todo instructor digital debe conocer",
        excerpt: "Si vas a enseñar en línea, estos son los respaldos oficiales que necesitas para dar confianza total a tus alumnos.",
        category: 'Educación',
        date: "10 Ene, 2026",
        readTime: "6 min",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 4,
        title: "Storytelling Pedagógico: El arte de enseñar a través de historias",
        excerpt: "Aprende a capturar la atención de tu audiencia y mejorar la retención de conocimientos usando narrativas poderosas.",
        category: 'Educación',
        date: "05 Ene, 2026",
        readTime: "7 min",
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800"
    }
];

const Blog: React.FC = () => {
    const [filter, setFilter] = useState<string>('Todos');

    const filteredPosts = filter === 'Todos'
        ? blogPosts
        : blogPosts.filter(post => post.category === filter);

    return (
        <div className="blog-page">
            <header className="blog-hero brand-gradient">
                <div className="container">
                    <h1>Blog de Cademmy Learning</h1>
                    <p>Insights sobre Educación 4.0, Inteligencia Artificial y Competencias Profesionales.</p>
                </div>
            </header>

            <section className="blog-content">
                <div className="container">
                    <div className="blog-filters">
                        {['Todos', 'IA', 'Educación', 'Empresas'].map(cat => (
                            <button
                                key={cat}
                                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                                onClick={() => setFilter(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="blog-grid">
                        {filteredPosts.map(post => (
                            <article key={post.id} className="blog-card">
                                <div className="blog-card-image" style={{ backgroundImage: `url(${post.image})` }}>
                                    <span className="blog-category-tag">{post.category}</span>
                                </div>
                                <div className="blog-card-body">
                                    <div className="blog-meta">
                                        <span>{post.date}</span>
                                        <span className="dot">•</span>
                                        <span>{post.readTime} lectura</span>
                                    </div>
                                    <h3>{post.title}</h3>
                                    <p>{post.excerpt}</p>
                                    <button className="read-more-link">Continuar leyendo →</button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="newsletter-section">
                <div className="container">
                    <div className="newsletter-card brand-gradient">
                        <h2>Suscríbete a nuestro Newsletter</h2>
                        <p>Recibe las últimas tendencias en formación y tecnología directamente en tu correo.</p>
                        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="Tu correo electrónico" required />
                            <button type="submit" className="white-btn">Unirme ahora</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
