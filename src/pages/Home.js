import React from "react";
import Navbar from "../components/Navbar";
import SidebarContainer from "../components/SidebarContainer";
import ContentHeader from "../components/ContentHeader";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div class="wrapper">
      <Navbar></Navbar>
      <SidebarContainer></SidebarContainer>
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Principal"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Principal"}
          ruta1={"/Home"}
        />
        <section class="content">
        <div className="container-fluid">
              <div className="row">

                <div className="col-lg-3 col-6">
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h3>Clientes</h3>
                      <p>&nbsp;</p>
                    </div>
                    <div className="icon">
                      <i className="fa fa-user" />
                    </div>
                    <Link to={"/proyectos-admin"} className="small-box-footer">
                      Ver Clientes
                      <i className="fas fa-arrow-circle-right" />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h3>Crear Cuenta Admin</h3>
                      <p>&nbsp;</p>
                    </div>
                    <div className="icon">
                      <i className="fa fa-user" />
                    </div>
                    <Link to={"/crear-cuenta-admin"} className="small-box-footer">
                      Crear Cuenta
                      <i className="fas fa-arrow-circle-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Home;