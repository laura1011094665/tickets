import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from 'sweetalert';

const Login = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    email: "",
    password: ""
  });

  const { email, password } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  }

  useEffect(() => {
    const emailInput = document.getElementById("email");
    if (emailInput) {
      emailInput.focus();
    }
  }, []);

  const iniciarSesion = async () =>{
    const verificarExistenciaUsuario = async (email, password) => {
      try {
        const response = await APIInvoke.invokeGET(
          `/usuario?email=${email}&password=${password}`
        );
        if (response && response.length > 0) {
          return response[0]; 
        }
        return null; 
      } catch (error) {
        console.error(error);
        return null; 
      }
    }

    if (password.length < 6){
      const msg = "Las contraseñas deben tener al menos 6 caracteres.";
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
    } else {
      const usuarioEncontrado = await verificarExistenciaUsuario(email, password);

      if (!usuarioEncontrado) {
        const msg = "No fue posible iniciar sesión, verifique los datos ingresados.";
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
      } else {
        const msg = "Bienvenido";
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
        const tipoUsuario = usuarioEncontrado.tipo_usuario; 

        if (tipoUsuario === "admin") {
          navigate("/home");
        } else if (tipoUsuario === "cliente") {
          navigate("/home2");
        } else {
          alert("Tipo de usuario desconocido");
        }
      }
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    iniciarSesion();
  }

  return (
    <div className="login-box" style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="login-logo">
        <Link to={"#"}><b>Iniciar</b>Sesión</Link>
      </div>
      <div className="card">
        <div className="card-body login-card-body">
          <p className="login-box-msg">Sign in to start your session</p>
          
          <form onSubmit={onSubmit}>
            <div className="input-group mb-3">
              <input
                type="email"
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
              <input
                type="password"
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


            <div className="row">
              <div className="col-8"></div>
            </div>

            <div className="social-auth-links text-center mb-3">
              <button type="submit" className="btn btn-block btn-primary">
                Ingresar
              </button>
              <Link to={"/crear-cuenta"} className="btn btn-block btn-danger">
                <i /> Crear Cuenta
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
