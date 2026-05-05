import React from 'react';
import './CoursePages.css';

const AvisoPrivacidad: React.FC = () => {
    return (
        <div className="course-page">
            <section className="course-hero online-bg" style={{ height: '300px', filter: 'grayscale(0.8)' }}>
                <div className="hero-overlay">
                    <h1>Aviso de Privacidad</h1>
                    <p>Comprometidos con la protección de tus datos personales.</p>
                </div>
            </section>

            <section className="course-details" style={{ textAlign: 'justify', lineHeight: '1.8', padding: '4rem 10%' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', color: 'var(--cademmy-charcoal)' }}>
                    <h2 style={{ color: 'var(--cademmy-orange)', marginBottom: '1.5rem' }}>Definiciones</h2>
                    <p>En atención a lo dispuesto por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, en el presente aviso se entenderá por:</p>
                    <p><strong>I. Datos Personales.</strong><br />
                        Cualquier información concerniente a una persona física identificada o identificable.</p>
                    <p><strong>II. Datos Personales Patrimoniales y Financieros.</strong><br />
                        Son aquellos datos personales que están relacionados con sus ingresos, créditos, bienes muebles e inmuebles.</p>
                    <p><strong>III. Datos Personales Sensibles.</strong><br />
                        Aquellos datos personales que afecten a la esfera más íntima de su titular, o cuya utilización indebida pueda dar origen a discriminación o conlleve un riesgo grave para éste. En particular, se consideran sensibles aquellos que puedan revelar aspectos como origen racial, étnico, estado de salud presente y futura, información genética, creencias religiosas, filosóficas y morales, afiliación sindical, opiniones políticas, preferencia sexual.</p>
                    <p><strong>IV. Derechos ARCO.</strong><br />
                        Derechos de acceso, rectificación, cancelación y oposición previstos en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.</p>
                    <p><strong>V. Ley.</strong><br />
                        Ley Federal de Protección de Datos Personales en Posesión de los Particulares.</p>
                    <p><strong>VI. Responsable.</strong><br />
                        “Cademmy” que lleva a cabo el tratamiento de sus datos personales.</p>
                    <p><strong>VII. Titular.</strong><br />
                        La persona física a quien corresponden los datos personales.</p>

                    <h2 style={{ color: 'var(--cademmy-orange)', marginTop: '2.5rem', marginBottom: '1.5rem' }}>Medios de obtención de los datos personales</h2>
                    <p>Le comunicamos que el medio establecido por el responsable (Cademmy) para recolectar los datos personales, es de manera directa por medios electrónicos ya sea a través del “chat”, correo electrónico, teléfono, formularios y de manera indirecta por medio de transferencias que le hacen llegar sus empresas filiales y/o terceros.</p>
                    <p>Así mismo ponemos a su disposición el número de teléfono: 55 52 93 9203, así como el correo <strong>contacto@cademmy.com</strong> y el sitio web: <strong>https://www.cademmy.com</strong>.</p>

                    <h2 style={{ color: 'var(--cademmy-orange)', marginTop: '2.5rem', marginBottom: '1.5rem' }}>Datos que se recaban</h2>
                    <p>Cademmy recabará los siguientes datos personales: Nombre completo, fecha de nacimiento, identificación oficial con fotografía, nacionalidad, domicilio, CURP, RFC, teléfono, correo electrónico.</p>

                    <h2 style={{ color: 'var(--cademmy-orange)', marginTop: '2.5rem', marginBottom: '1.5rem' }}>Finalidades del tratamiento de sus datos personales</h2>
                    <p>Los datos personales mencionados en el apartado anterior que Cademmy recabe, serán utilizados exclusivamente para dar seguimiento a comentarios, consultas, quejas y reclamaciones que usted presente en relación con nuestro productos y servicios, mantener controles estadísticos y administrativos y, en su caso, para fines de publicidad y prospección comercial. En caso de que usted no quiera recibir publicidad y ofertas, nos lo puede hacer saber al teléfono <strong>55 52 93 9203</strong> de lunes a viernes de 9:00 a 14:00 y de 16:00 a 19:00 horas, o a través del correo electrónico <strong>contacto@cademmy.com</strong>.</p>

                    <h2 style={{ color: 'var(--cademmy-orange)', marginTop: '2.5rem', marginBottom: '1.5rem' }}>Finalidades secundarias</h2>
                    <p>Cademmy graba audios, videos y toma de fotografías de los diferentes eventos que realizamos como son: eventos en los que se recaba información, entre otras, este material es para uso exclusivo de Cademmy, incluyendo la difusión en distintos medios impresos y/o electrónicos tales como periódicos, revistas, espectaculares, páginas de internet, redes sociales, con fines publicitarios, así como la evaluación de la prestación de los mismos. Todos aquellos datos personales que el titular ingrese o proporcione voluntariamente al responsable, por cualquier medio, se sujetarán a las políticas de seguridad y privacidad interna.</p>
                    <p>De conformidad con el artículo 8 de la Ley Federal de Protección de Datos Personales, si usted no manifiesta su oposición para el tratamiento de sus datos personales, se entenderá que nos otorga su consentimiento expreso para ello. De cualquier forma, nos comprometemos a no tratar estos datos para finalidades diversas de las apuntadas en este Aviso de Privacidad, salvo en el caso de las excepciones previstas en el artículo 37 de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.</p>

                    <h2 style={{ color: 'var(--cademmy-orange)', marginTop: '2.5rem', marginBottom: '1.5rem' }}>Transferencia de datos personales</h2>
                    <p>Le informamos que sus datos personales pueden ser transferidos por Cademmy y tratados dentro y fuera del país a personas distintas de esta empresa. En ese sentido, su información puede ser compartida con ICEMéxico, para dar seguimiento a los comentarios, consulta, quejas y reclamaciones que usted presente, así como para mantener controlar administrativos y estadísticos. Usted puede manifestar su oposición, o bien revocar su consentimiento mediante el procedimiento de ejercicio de los Derechos ARCO.</p>
                    <p>El tercero receptor asumirá las mismas obligaciones que correspondan al responsable que transfirió los datos. El Responsable no venderá, regalará, facilitará ni alquilará información a terceros, se compromete a no transferir datos personales; salvo los mencionados anteriormente y los casos establecidos por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.</p>

                    <h2 style={{ color: 'var(--cademmy-orange)', marginTop: '2.5rem', marginBottom: '1.5rem' }}>Derechos Arco</h2>
                    <p>Así mismo le informamos que podrá ejercer en todo momento sus derechos de acceso, rectificación, cancelación u oposición (ARCO); revocar el consentimiento que nos ha otorgado para el tratamiento de sus datos personales, a fin de que dejemos de hacer uso de los mismos. Dirigiendo su solicitud mediante escrito libre a <strong>Luis Mauricio Valdés Alba</strong>, Responsable de el área de marketing al siguiente correo electrónico <strong>mauvaldes@cademmy.com</strong> o bien presentar esta misma vía correo postal a las oficinas ubicadas en Av. Santa Fe 505 Mezanine Oficina 2B, Santa Fe, Cuajimalpa, México, CDMX CP 01219. Su solicitud deberá contener:</p>
                    <ul style={{ listStyleType: 'lower-alpha', paddingLeft: '2rem' }}>
                        <li>Nombre del titular.</li>
                        <li>Documento que acredite su identidad.</li>
                        <li>Domicilio de titular o dirección de correo electrónico para comunicar respuesta a solicitud.</li>
                        <li>Descripción de datos personales sobre los que se pretende ejercer algún derecho ARCO.</li>
                        <li>Cualquier otro elemento que permita la localización de los datos personales y atención a la solicitud.</li>
                    </ul>
                    <p>El tiempo de respuesta para su solicitud no excederá de 10 días hábiles contados a partir del día siguiente de su recepción.</p>
                    <p>Así también, le informamos que si usted no está de acuerdo con la respuesta que el demos a su solicitud que limite el uso o divulgación de datos, usted tiene el derecho de iniciar un procedimiento de protección de datos ante el Instituto Federal de Acceso a la Información y Protección de Datos (www.ifai.org.mx) dentro de los 15 días siguientes a la fecha en que reciba la respuesta de Cademmy o a partir de que concluya el plazo de 20 días contados a partir de la fecha de recepción de su solicitud de ejercicio de derechos.</p>
                    <p>El responsable le informa que no utiliza “cookies y web beacons” para obtener información personal de usted de manera automática.</p>

                    <h2 style={{ color: 'var(--cademmy-orange)', marginTop: '2.5rem', marginBottom: '1.5rem' }}>Modificaciones al aviso de privacidad</h2>
                    <p>Nos reservamos el derecho de efectuar en cualquier momento modificaciones o actualizaciones al presente aviso de privacidad, para la prestación u ofrecimiento de nuestros servicios. Cualquier modificación al presente aviso le será notificada a través de cualquiera de los siguientes medios: un comunicado por escrito publicado, en las instalaciones de Cademmy; un mensaje enviado al último correo electrónico que nos haya proporcionado o en nuestra página de Internet <strong>https://www.cademmy.com</strong> sección aviso de privacidad.</p>

                    <p style={{ marginTop: '3rem', fontSize: '0.9rem', color: 'var(--cademmy-grey)' }}>
                        <strong>Fecha de última modificación: Enero del 2026</strong>
                    </p>
                </div>
            </section>
        </div>
    );
};

export default AvisoPrivacidad;
