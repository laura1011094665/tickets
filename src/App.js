import React, {Fragment} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './pages/auth/login';
import CrearCuenta from './pages/auth/crearCuenta';
import Home from './pages/Home';
import ProyectosAdmin from './pages/proyectos/ProyectosAdmin';
import ProyectoCrear from './pages/proyectos/ProyectosCrear';
import ProyectosEditar from './pages/proyectos/oyectosEditar';
import TareasAdmin from './pages/proyectos/TareasAdmin';
import TareasCrear from './pages/proyectos/CrearTarea';
import EditarTarea from './pages/proyectos/EditarTareas';
import Inicio from './pages/auth/Inicio';
import Home2 from './pages/Home2';
import BandejaEntrada from './pages/proyectos/bandejaDeEntradasTickets';
import TicketAdmin from './pages/proyectos/TicketsAdmin';
import TicketCrear from './pages/proyectos/TicketCrear';
import BandejaEntrAdmin from './pages/proyectos/BandejaEntradaAdmin';
import CrearCuentaAdmin from './pages/auth/crearCuentaAdmin';


function App() {


  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/login" exact element={<Login/>}/>
          <Route path="/" exact element={<Inicio/>}/>
          <Route path="/crear-cuenta" exact element={<CrearCuenta/>}/>
          <Route path="/crear-cuenta-admin" exact element={<CrearCuentaAdmin/>}/>
          <Route path="/home" exact element={<Home/>}/>
          <Route path="/proyectos-admin" exact element={<ProyectosAdmin/>}/>
          <Route path="/proyecto-crear" exact element={<ProyectoCrear/>}/>
          <Route path="/proyecto-editar/:id" exact element={<ProyectosEditar/>}/>
          <Route path="/tareas-admin/:id" exact element={<TareasAdmin/>}/>
          <Route path="/tareas-crear/:idclientes" exact element={<TareasCrear/>}/>
          <Route path="/tareas-editar/:idclientes" exact element={<EditarTarea/>}/>
          <Route path="/home2" exact element={<Home2/>}/>
          <Route path="/ticket-admin" exact element={<TicketAdmin/>}/>
          <Route path="/bandeja" exact element={<BandejaEntrada/>}/>
          <Route path="/bandeja-admin" exact element={<BandejaEntrAdmin/>}/>
          <Route path="/tickets-crear" exact element={<TicketCrear/>}/>




        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
