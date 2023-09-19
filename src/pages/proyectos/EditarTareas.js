import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import SidebarContainer from '../../components/SidebarContainer';
import ContentHeader from '../../components/ContentHeader';
import Footer from '../../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const EditarTarea = () => {

    const navigate = useNavigate();

  const { idclientes } = useParams();
  let arreglo = idclientes.split("@");
  const idTicket = arreglo[0];
  const nombreTicket = arreglo[1];
  const idC = arreglo[2];
  const nombreClie = arreglo[3];
  const tituloPagina = `Edicion De Ticket: ${nombreClie}`;

  const [ticket, setTareas] = useState({
    nombre: nombreTicket,
  });

  const { nombre } = ticket;

  useEffect(() => {
    document.getElementById("nombre").focus();
  }, []);

  const onChange = (e) => {
    setTareas({
      ...ticket,
      [e.target.name]: e.target.value,
    });
  };

  const editarTareas = async () => {
    let arreglo = idclientes.split("@");
    const idTicket = arreglo[0];
    const nombreTicket = arreglo[1];
    const idC = arreglo[2];
    const nombreClie = arreglo[3];

    const data = {
      clientes: idC,
      nombre: ticket.nombre,
      estado: false
    };

    const response = await APIInvoke.invokePUT(`/ticket/${idTicket}`, data);
    const idTicketEditado = response.id;

    if (idTicket === idTicketEditado) {
      const msg = "La ticket No Fue Editada Correctamente";
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
    } else {
      const msg = "La ticket Fue Editada Correctamente";
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
      navigate(`/tareas-admin/${idC}@${nombreClie}`);
    }
  };
    const onSubmit = (e) => {
        e.preventDefault();
        editarTareas();

    }


    return (
        <div className="wrapper">
            <Navbar />
            <SidebarContainer />
            <div className="content-wrapper">
                <ContentHeader
                    titulo={tituloPagina}
                    breadCrumb1={"Listado de Ticket"}
                    breadCrumb2={"Edicion"}
                    ruta1={`/tareas-admin/${idC}@${nombreClie}`}
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
                                    <button type="submit" className="btn btn-primary">Editar</button>
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

export default EditarTarea;