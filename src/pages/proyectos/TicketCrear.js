import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import SidebarContainer from '../../components/SidebarContainer';
import ContentHeader from '../../components/ContentHeader';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom'
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const TicketCrear = () => {
    const navigate = useNavigate();

    const [ticket, setTickets] = useState({
        nombre: '',
    });

    const { nombre } = ticket;

    useEffect(() => {
        const nombreInput = document.getElementById("nombre");
        if (nombreInput) {
            nombreInput.focus();
        }
    }, []);

    const onChange = (e) => {
        setTickets({
            ...ticket,
            [e.target.name]: e.target.value
        })
    }

    const crearProyecto = async () => {
        
        const data = {
            nombre: ticket.nombre
        };

        const response = await APIInvoke.invokePOST(`/ticket`, data)
        const id = response.id;

        const verificarExistenciaTicket = async (id) => {
            try {
              const response = await APIInvoke.invokeGET(
                `/ticket?id=${id}`
              );
              if (response && response.length > 0) {
                return true; // El usuario ya existe
              }
              return false; // El usuario no existe
            } catch (error) {
              console.error(error);
              return false; // Maneja el error si la solicitud falla
            }
          }
        
          const ticketExistencia = await verificarExistenciaTicket(id);
        if (!ticketExistencia) {

            const msg = "el ticket no fue creado correctamente";
            swal({
                title: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            })
        }else{
            navigate("/ticket-admin")
            const msg = "el ticket fue creado correctamente";
            swal({
                title: 'Informacion',
                text: msg,
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-primary',
                        closeModal: true
                    }
                }
            })

            setTickets({
                nombre:'',
                apellido: '',
                telefono:''
            })
        }

    }

    const onSubmit = (e) => {
        e.preventDefault();
        crearProyecto();
    }

    return (
        <div className="wrapper">
            <Navbar />
            <SidebarContainer />
            <div className="content-wrapper">
                <ContentHeader
                    titulo={"Creación del ticket"}
                    breadCrumb1={"Listado de tickets"}
                    breadCrumb2={"Creación"}
                    ruta1={"/ticket-admin"}
                />
                <section className="content">
                    <div className="card">
                        <div className="card-header">
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
                            <form onSubmit={onSubmit}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="nombre">Nombre:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nombre"
                                            name="nombre"
                                            placeholder="Ingrese el nombre del cliente"
                                            value={nombre}
                                            onChange={onChange}
                                            required
                                        />

                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Crear</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default TicketCrear;
