import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import SidebarContainer from '../../components/SidebarContainer';
import ContentHeader from '../../components/ContentHeader';
import Footer from '../../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

const BandejaEntrada = () => {


    const [mensajes, setMensajes] = useState([]);
    const [nuevoMensaje, setNuevoMensaje] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const mensajesGuardados = JSON.parse(localStorage.getItem('mensajes')) || [];
        setMensajes(mensajesGuardados);
    }, []);

    useEffect(() => {
        localStorage.setItem('mensajes', JSON.stringify(mensajes));
    }, [mensajes]);

    const enviarMensaje = (remitente) => {
        if (nuevoMensaje.trim() === '') return;

        const nuevoMensajeObj = {
            id: mensajes.length + 1,
            remitente,
            contenido: nuevoMensaje,
        };

        setMensajes([...mensajes, nuevoMensajeObj]);
        setNuevoMensaje('');
    };


    return (
        <div className="wrapper">
            <Navbar />
            <SidebarContainer />
            <div className="content-wrapper">
                <ContentHeader
                    titulo={"Bandeja de Entrada"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Bandeja de Entrada"}
                    ruta1={"/home2"}
                />
                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-tools">
                                <button
                                    type="button"
                                    className="btn btn-tool"
                                    data-card-widget="collapse"
                                    title="Collapse"
                                >
                                    <i className="fas fa-minus" />
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-tool"
                                    data-card-widget="remove"
                                    title="Remove"
                                >
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="bandeja-entrada">
                                <h2>Bandeja de Entrada</h2>
                                <div className="mensajes">
                                    {mensajes.map((mensaje) => (
                                        <div
                                            key={mensaje.id}
                                            className={`mensaje ${mensaje.remitente === 'Cliente'
                                                    ? 'cliente'
                                                    : 'empleado'
                                                }`}
                                        >
                                            <strong>{mensaje.remitente}:</strong> {mensaje.contenido}
                                        </div>
                                    ))}
                                </div>
                                <div className="nuevo-mensaje">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Escribe un mensaje..."
                                        value={nuevoMensaje}
                                        onChange={(e) => setNuevoMensaje(e.target.value)}
                                    />&nbsp;&nbsp;&nbsp;
                                    <div className="card-footer">
                                        <button onClick={() => enviarMensaje('Cliente')} className='btn btn-sm btn-dark'>Enviar como Cliente</button>&nbsp;&nbsp;&nbsp;
                                        <button onClick={() => enviarMensaje('Empleado')} className='btn btn-sm btn-primary'>Enviar como Empleado</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default BandejaEntrada;
