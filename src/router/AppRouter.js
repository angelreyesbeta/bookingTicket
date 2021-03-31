import React from 'react'

import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
  } from 'react-router-dom';
import { Navbar } from '../components/navbar/Navbar';
import { BoletasPages } from '../pages/BoletasPages';
import { CompradoresPage } from '../pages/CompradoresPage';
import { HomePage } from '../pages/HomePage';
import { ListReservaPages } from '../pages/ListReservaPages';
import { ReservaPages } from '../pages/ReservaPages';



export const AppRouter = () => {

    

    return (
        <Router>
            <div>
            <Navbar/>
                <Switch>
                    <Route
                        exact
                        path="/compradores"
                        component={CompradoresPage}
                    />   
                    <Route
                        exact
                        path="/boletas"
                        component={BoletasPages}
                    />   
                     <Route exact path="/reserva/:boletaId/:boletaDescri/:boletaCantidad" component={ReservaPages}/>
                    <Route 
                        exact
                        path="/"
                        component={HomePage}
                    />   
                    <Route 
                        exact
                        path="/bookingList"
                        component={ListReservaPages}
                    />   
                    <Redirect to="/"/>
                </Switch>
            </div>
        </Router>
    )
}
