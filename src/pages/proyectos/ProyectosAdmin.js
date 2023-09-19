import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import SidebarContainer from '../../components/SidebarContainer';
import ContentHeader from '../../components/ContentHeader';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const ProyectosAdmin = () => {
    const [clientes, setClientes] = useState([]);
    const cargarCliente = async () => {
        try {
            var response = await APIInvoke.invokeGET('/clientes');
            console.log('Respuesta de la API:', response); 
    
            if (Array.isArray(response) && response.length > 0) {
                setClientes(response);
            } else {
                console.error('La respuesta de la API no contiene proyectos.');
            }
        } catch (error) {
            console.error('Error al cargar los proyectos:', error);
        }
    };
      

    useEffect(() => {
        cargarCliente();
    }, []);

    const eliminarCliente = async(e, id)=>{
        e.preventDefault();
        const verificarExistenciaUsuario = async (id) => {
            try {
              const response = await APIInvoke.invokeGET(
                `/clientes?id=${id}`
              );
              if (response && response.length > 0) {
                return true; 
              }
              return false; 
            } catch (error) {
              console.error(error);
              return false;
            }
          };
    
          const usuarioExistente = await verificarExistenciaUsuario(id);
    
        if(usuarioExistente){
            const response= await APIInvoke.invokeDELETE(`/clientes/${id}`);
            const msg = "Cliente Eliminado Correctamente";
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
            cargarCliente();
        }else{
            const msg = "El Cliente No Pudo Ser Eliminado";
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
                    ruta1={"/Home"}
                />
                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title"><Link to={"/proyecto-crear"} type='button' className="btn btn-block btn-primary btn-sm">Crear Cliente</Link></h3>
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
                                        <th style={{ width: '15%' }}>Nombre</th>
                                        <th style={{ width: '20%' }}>Apellido</th>
                                        <th style={{ width: '17%' }}>Telefono</th>
                                        <th style={{ width: '20%' }}>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    clientes.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.nombre}</td>
                                            <td>{item.apellido}</td>
                                            <td>{item.telefono}</td>
                                            <td>
                                                <Link to={`/tareas-admin/${item.id}@${item.nombre}@${item.apellido}@${item.telefono}`} className='btn btn-sm btn-info'>Tickets</Link>&nbsp;&nbsp;&nbsp;
                                                <Link to={`/proyecto-editar/${item.id}@${item.nombre}@${item.apellido}@${item.telefono}`} className='btn btn-sm btn-primary'>Editar</Link>&nbsp;&nbsp;&nbsp;
                                                <button onClick={(e) => eliminarCliente(e, item.id)} className='btn btn-sm btn-danger'>Borrar</button>
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

export default ProyectosAdmin;