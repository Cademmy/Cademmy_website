import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import Pillars from '../components/Pillars';
import Trust from '../components/Trust';

const Home: React.FC = () => {
    return (
        <div className="home-page">
            <Helmet>
                <title>Cademmy | Formación 4.0 e Instrumentos Defendibles</title>
                <meta name="description" content="Procesos formativos fundamentados en evidencia y alineados a estándares de competencia." />
            </Helmet>
            <Hero />
            <Pillars />
            <Trust />
        </div>
    );
};

export default Home;
