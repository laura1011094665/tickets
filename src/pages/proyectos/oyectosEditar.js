import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import SidebarContainer from '../../components/SidebarContainer';
import ContentHeader from '../../components/ContentHeader';
import Footer from '../../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const ProyectosEditar = () => {

    const navigate = useNavigate();

    const { id } = useParams();
    console.log(id)
    let arreglo = id.split('@')
    const nombreClie = arreglo[1]
    const apellidoClie = arreglo[2]
    const telefonoClie = arreglo[3]

    const [clientes, setClientes] = useState({
        nombre: nombreClie,
        apellido: apellidoClie,
        telefono: telefonoClie
    })
    const{nombre, apellido, telefono}=clientes;
    const onChange = (e) => {
        setClientes({
            ...clientes,
            [e.target.name]: e.target.value
        })
    }

    const editarCliente = async () => {

        let arreglo = id.split('@')
        const idC = arreglo[0]

        const data = {
            nombre: clientes.nombre,
            apellido: clientes.apellido,
            telefono: clientes.telefono
        }

        const response = await APIInvoke.invokePUT(`/clientes/${idC}`, data)
        const idClie = response.id;

        if (idClie === idC) {
            const msg = "el cliente no fue editado correctamente";
            swal({
                title: 'Informacion',
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
            });

        }else{
            navigate("/proyectos-admin")
            const msg = "el cliente fue editado correctamente";
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
            });
        }
    }
    const onSubmit = (e) => {
        e.preventDefault()
        editarCliente()
    }


    return (
        <div className="wrapper">
            <Navbar />
            <SidebarContainer />
            <div className="content-wrapper">
                <ContentHeader
                    titulo={"Creación del Proyecto"}
                    breadCrumb1={"Listado de Proyectos"}
                    breadCrumb2={"Creación"}
                    ruta1={"/proyectos-admin"}
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
                                        <label htmlFor="nombre">Apellido:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="apellido"
                                            name="apellido"
                                            placeholder="Ingrese el apellido del cliente"
                                            value={apellido}
                                            onChange={onChange}
                                            required
                                        />
                                        
                                        <label htmlFor="telefono">Telefono:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="telefono"
                                            name="telefono"
                                            placeholder="Ingrese el telefono del cliente"
                                            value={telefono}
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

export default ProyectosEditar;