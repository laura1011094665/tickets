import React from "react";
import { Link } from "react-router-dom";

const Inicio = () => {
    return (
        <div>
            <div>
                <header>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <Link to={"#"} className="navbar-brand">LalaAssistanceCenter</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/"}>Inicio</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/login"}>Iniciar Sesión</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/crear-cuenta"}>Crear Cuenta</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6">
                            <h1 className="display-4">Bienvenido a Lala Assistance Center</h1>
                            <p className="lead">LalaAsistentCenter es una innovadora plataforma de atención al cliente diseñada para 
                            brindar soluciones excepcionales a las empresas de todos los tamaños. Nuestra visión es ser tu socio estratégico 
                            en la gestión de la satisfacción del cliente, proporcionando servicios de primer nivel que impulsan el crecimiento de 
                            tu negocio. </p>
                            <Link to={"#"} className="btn btn-primary btn-lg">Leer más</Link>
                        </div>
                        <div className="col-md-6">
                            <img src="https://img.freepik.com/vector-gratis/ilustracion-soporte-al-cliente-plano-organico_23-2148899174.jpg" className="img-fluid rounded-circle" />
                        </div>
                    </div>
                </div>
                <section className="bg-light py-5">
                    <div className="container">
                        <h2 className="text-center">Información para Nuestros Clientes</h2>
                        <p className="lead text-center">
                            En LalaAssistanceCenter, nos enorgullece ofrecer productos/servicios de alta calidad y brindar la mejor experiencia posible a nuestros clientes. Estamos comprometidos en satisfacer tus necesidades y superar tus expectativas. Aquí te proporcionamos información clave sobre nuestra empresa y cómo podemos ayudarte:
                        </p>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Nuestra Misión</h5>
                                        <p className="card-text">
                                            Nuestra empresa lo que le gusta es que nuestros clientes esten satisfechos y trabajamos en estrecha colaboración con nuestros clientes para lograrlo.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Calidad Garantizada</h5>
                                        <p className="card-text">
                                            En LalaAssistanceCenter, ponemos un énfasis significativo en la calidad. Nuestros productos/servicios son cuidadosamente diseñados, fabricados y evaluados para garantizar que cumplen con los más altos estándares.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Soporte al Cliente</h5>
                                        <p className="card-text">
                                            Tu satisfacción es nuestra prioridad. Ofrecemos un servicio de atención al cliente excepcional para responder a tus preguntas, resolver problemas y brindarte asistencia en todo momento.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="bg-dark text-light text-center py-3" style={{ position: "fixed", bottom: "0", width: "100%" }}>
                    <p>© 2023 LalaAssistanceCenter. Todos los derechos reservados.</p>
                </footer>
            </div>
        </div>
    );
}

export default Inicio;
