import React from 'react'
import { NavLink,Link } from 'react-router-dom'

export const Navbar = () => {
    
   
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                
                <Link
                    className="navbar-brand"
                    to="/"
                >Booking Tick App
                </Link>
               
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
                    <div className="navbar-nav ml-auto">
                    <NavLink
                        className="nav-item nav-link"
                        activeClassName="active"
                        exact to="/"
                    >Home
                    </NavLink>
                    <NavLink
                        className="nav-item nav-link"
                        activeClassName="active"
                        exact to="/compradores"
                    >Compradores
                    </NavLink>
                    <NavLink
                        className="nav-item nav-link"
                        activeClassName="active"
                        exact to="/boletas"
                    >Boletas
                    </NavLink>
                    <NavLink
                        className="nav-item nav-link"
                        activeClassName="active"
                        exact to="/bookingList"
                    >Lista de reservas
                    </NavLink>
                   
                    
                    </div>
                </div>
            </nav>


        </>
    )
}
