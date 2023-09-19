import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from 'sweetalert';

const CrearCuenta = () => {

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
    tipo_usuario:"cliente"
  });

  const { nombre, email, password, confirmar, tipo_usuario } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    const nombreInput = document.getElementById("nombre");
    if (nombreInput) {
      nombreInput.focus();
    }
  }, []);

  const crearCuenta = async () => {

    const verificarExistenciaUsuario = async (nombre) => {
      try {
        const response = await APIInvoke.invokeGET(
          `/usuario?nombre=${nombre}`
        );
        if (response && response.length > 0) {
          return true; 
        }
        return false; 
      } catch (error) {
        console.error(error);
        return false;
      }
    }

    if (password !== confirmar) {
      const msg = "las contraseñas son diferentes.";
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
    } else if(password.length<6){
      const msg = "la contraseña tiene que tener mas de 6 caracteres";
        swal({
          title: '',
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
      const usuarioExistente = await verificarExistenciaUsuario(nombre);
      const data = {
        nombre: usuario.nombre,
        email: usuario.email, 
        password: usuario.password,
        tipo_usuario: usuario.tipo_usuario
      }
      const response = await APIInvoke.invokePOST(`/usuario`, data);
      const mensaje = response.msg;
      if (usuarioExistente) {
        const msg = "el usuario ya existe.";
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
        });
      }else{
        const msg = "el usuario fue registrado exitosamente";
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

        setUsuario({
          nombre: "",
          email: "",
          password: "",
          confirmar: "",
          tipo_usuario:""
        })
      }
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    await crearCuenta();
  }

  return (
    <div className="login-box" style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="login-logo">
        <Link to={"#"}><b>Crear</b>Cuenta</Link>
      </div>
      {/* /.login-logo */}
      <div className="card">
        <div className="card-body login-card-body">
          <p className="login-box-msg">Ingrese los datos del usuario. </p>

          <form onSubmit={onSubmit}>
            <div className="input-group mb-3">
              <input type="text"
                className="form-control"
                placeholder="Nombre"
                id="nombre"
                name="nombre"
                value={nombre}
                onChange={onChange}
                required
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-user" />
                </div>
              </div>
            </div>

            <div className="input-group mb-3">
              <input type="email"
                className="form-control"
                placeholder="Email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope" />
                </div>
              </div>
            </div>

            <div className="input-group mb-3">
              <input type="password"
                className="form-control"
                placeholder="Password"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                required
              />

              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>

            <div className="input-group mb-3">
              <input type="password"
                className="form-control"
                placeholder="Confirmar Contraseña"
                id="confirmar"
                name="confirmar"
                value={confirmar}
                onChange={onChange}
                required
              />
              

              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>

            

            <div className="row">
              <div className="col-8">
              </div>
            </div>

            <div className="social-auth-links text-center mb-3">
              <button type="submit" className="btn btn-block btn-primary" >Crear cuenta</button>
              <Link to={"/login"} className="btn btn-block btn-danger">
                <i /> Regresar al login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CrearCuenta;
