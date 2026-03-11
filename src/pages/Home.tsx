import React from 'react';
import { useUser } from '../context/UserContext';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import Pillars from '../components/Pillars';
import Trust from '../components/Trust';
import HomeChoice from '../components/HomeChoice';

const Home: React.FC = () => {
    const { userType } = useUser();

    if (userType === 'none') {
        return <HomeChoice />;
    }

    return (
        <div className="home-page">
            <Helmet>
                <title>Cademmy | Formación 4.0 y Certificación SEP EC0217.01</title>
                <meta name="description" content="Impulsa tu carrera o empresa con la metodología Formador 4.0 y certificaciones oficiales SEP CONOCER." />
            </Helmet>
            <Hero />
            <Pillars />
            <Trust />
        </div>
    );
};

export default Home;
