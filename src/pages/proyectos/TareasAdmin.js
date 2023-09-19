import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import SidebarContainer from '../../components/SidebarContainer';
import ContentHeader from '../../components/ContentHeader';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const TareasAdmin = () => {
    const [ticket, setTickets] = useState([]);

    const { id } = useParams();
    let arreglo = id.split('@')
    const idClie = arreglo[0];
    const nombreClie = arreglo[1];
    const tituloPagina = `Listado de Ticket: ${nombreClie}`;

    const cargarTareas = async () => {
        try {
            const response = await APIInvoke.invokeGET(`/ticket?clientes=${idClie}`);
            setTickets(response);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        cargarTareas();
    }, []);

    const eliminarTarea = async (e, idTicket, idClie) => {
        e.preventDefault();
        try {
            const response = await APIInvoke.invokeDELETE(`/ticket/${idTicket}?clientes=${idClie}`);
            if (response.msg !== "Proyecto Eliminado Correctamente") {
                swal({
                    title: "Informacion",
                    text: response.msg,
                    icon: "success",
                    buttons: {
                        confirmar: {
                            text: "Ok",
                            value: true,
                            visible: true,
                            className: "btn btn-primary",
                            closeModal: true,
                        },
                    },
                });
                cargarTareas();
            } else {
                swal({
                    title: "Error",
                    text: response.msg,
                    icon: "error",
                    buttons: {
                        confirmar: {
                            text: "Ok",
                            value: true,
                            visible: true,
                            className: "btn btn-danger",
                            closeModal: true,
                        },
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="wrapper">
            <Navbar />
            <SidebarContainer />
            <div className="content-wrapper">
                <ContentHeader
                    titulo={tituloPagina}
                    breadCrumb1={"tickets"}
                    ruta1={"/proyectos-admin"}
                />
                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <Link to={`/tareas-crear/${id}`} className="btn btn-block btn-primary btn-sm">Crear Ticket</Link>
                            </h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                    <i className="fas fa-minus" />
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ width: '10%' }}>Id</th>
                                        <th style={{ width: '75%' }}>Nombre</th>
                                        <th style={{ width: '15%' }}>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ticket.map(item => 
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.nombre}</td>
                                            <td>
                                                <Link to={`/tareas-editar/${item.id}@${item.nombre}@${item.clientes}@${nombreClie}`} className='btn btn-sm btn-primary'>Editar</Link>&nbsp;&nbsp;&nbsp;
                                                <button onClick={(e) => eliminarTarea(e, item.id, item.clientes)} className='btn btn-sm btn-danger'>Borrar</button>&nbsp;&nbsp;&nbsp;
                                                <Link to={`/bandeja-admin`} className='btn btn-sm btn-dark'>Solicitudes</Link>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default TareasAdmin;
