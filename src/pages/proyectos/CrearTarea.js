import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import SidebarContainer from '../../components/SidebarContainer';
import ContentHeader from '../../components/ContentHeader';
import Footer from '../../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const TareasCrear = () => {
    const navigate= useNavigate();

    const [ticket, setTickets] = useState({
        nombre: ''
    })

    const {nombre} = ticket;

    const{idclientes}= useParams();
    let arreglo = idclientes.split('@');
    const nombreClie= arreglo[1];
    const tituloPagina = `Creacion De Ticket: ${nombreClie}`

    useEffect(() => {
        document.getElementById("nombre").focus();
      }, []);

      const onChange= (e)=>{
        setTickets({
            ...ticket,
            [e.target.name]: e.target.value
        })
      }

      const crearTareas=async ()=>{
        let arreglo = idclientes.split('@');
        const idC= arreglo[0];

    const data= {
        clientes: idC,
        nombre: ticket.nombre
    }

    const response= await APIInvoke.invokePOST(`/ticket`,data)
    const idTicket = response.id;

    if(idTicket === ''){
        const msg = "La ticket No Fue Creada Correctamente";
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

    }else{
        const msg = "La ticket Fue Creada Correctamente";
      swal({
        title: "Informacion",
        text: msg,
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
      navigate(`/tareas-admin/${idclientes}`)
    }
      }

      const onSubmit = (e)=>{
        e.preventDefault();
        crearTareas();
      }
    return (
        <div className="wrapper">
            <Navbar />
            <SidebarContainer />
            <div className="content-wrapper">
                <ContentHeader
                    titulo={"Creación de la Ticket"}
                    breadCrumb1={"Listado de Ticket"}
                    breadCrumb2={"Creación"}
                    ruta1={`/tareas-admin/${idclientes}`}
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
                                            placeholder="Ingrese el nombre de la tarea"
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

export default TareasCrear;
