import React from 'react';
import Menu from './Menu';
import { Link } from 'react-router-dom';

const SidebarContainer = () => {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link to={"../../index3.html"} className="brand-link">
                <img src="https://dibujosycolores.com/letras/letra-l/letra-l-6.jpg" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                <span className="brand-text font-weight-light">LalaAssistanceCenter</span>
            </Link>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="info">
                        &nbsp;
                        </div>
                    <div className="info">
                        <Link to={"/Home"} className="d-block">Menu principal</Link>
                    </div>
                </div>
                <Menu></Menu>


            </div>
        </aside>

    );
}

export default SidebarContainer;