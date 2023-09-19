import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import SidebarContainer from '../../components/SidebarContainer';
import ContentHeader from '../../components/ContentHeader';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const TicketAdmin = () => {
    const [ticket, setTickets] = useState([]);
    const cargaTickets = async () => {
        try {
            var response = await APIInvoke.invokeGET('/ticket');
            console.log('Respuesta de la API:', response); // Verifica la respuesta de la API
    
            if (Array.isArray(response) && response.length > 0) {
                setTickets(response);
            } else {
                console.error('La respuesta de la API no contiene ticket.');
            }
        } catch (error) {
            console.error('Error al cargar los ticket:', error);
        }
    };
      

    useEffect(() => {
        cargaTickets();
    }, []);

    const eliminarTicket = async(e, id)=>{
        e.preventDefault();
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
          };
    
          const ticketExistencia = await verificarExistenciaTicket(id);
    
        if(ticketExistencia){
            const response= await APIInvoke.invokeDELETE(`/ticket/${id}`);
            const msg = "ticket Eliminado Correctamente";
            swal({
              title: "Informacion",
              text: msg,
              icon: "success",
              buttons: {
                confirmar: {
                  text: "Ok",
                  value: true,
                  visible: true,
                  className: "btn btn-prymari",
                  closeModal: true,
                },
              },
            });
            cargaTickets();
        }else{
            const msg = "El ticket No Pudo Ser Eliminado";
            swal({
              title: "Error",
              text: msg,
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
      }



    return (
        <div className="wrapper">
            <Navbar />
            <SidebarContainer />
            <div className="content-wrapper">
                <ContentHeader
                    titulo={"Listado de Clientes"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Clientes"}
                    ruta1={"/home2"}
                />
                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title"><Link to={"/tickets-crear"} type='button' className="btn btn-block btn-primary btn-sm">Crear Ticket</Link></h3>
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
                                        <th style={{ width: '20%' }}>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    ticket.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.nombre}</td>
                                            <td>
                                                <Link to={`/bandeja`} className='btn btn-sm btn-dark'>Solicitud</Link>
                                                
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default TicketAdmin;