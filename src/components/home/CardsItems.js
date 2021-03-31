import React from 'react'
import { Link } from 'react-router-dom'

export const CardsItems = ({boletas,colors}) => {
  
    return (
        <>
        <div className="col-lg-4 col-md-6">
            <div className={"card text-white bg-"+colors+" mb-3"}>
               <div className="card-header text-center"><strong>{boletas.description}</strong></div>
               <div className="card-body">
                 <h6 className="card-title text-center">Available ticked</h6>
                 <h1 className="card-title text-center">{boletas.cantidad}</h1>
                 <Link className="card-link" to={`./reserva/${boletas.id}/${boletas.description}/${boletas.cantidad}`}>
                    Reservar
                </Link>
               </div>
             </div>
           </div>
        </>
    )
}
