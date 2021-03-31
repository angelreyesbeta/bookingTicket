import React, { useEffect, useState } from 'react'
import { config } from '../../helpers/config'
import {getReservas} from '../../helpers/getReservas'
import { TableItem } from './TableItem'

export const ListaReservas = () => {
    const [dataReservas, setDataReservas] = useState([])

    const ListReservas=()=>{
        getReservas(config.urlReservas)
             .then((reservas=>{

                 setDataReservas(reservas)
                 
             })
                
            ) 
    }
    
    useEffect(() => {
        ListReservas();
    },[])
    return (
        <div className="container mt-5">
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>ID BOLETA</th>
                        <th>ID COMPRADOR</th>
                        <th>CANTIDAD</th>
                    </tr>
                </thead>
                    <tbody>
                        {
                            dataReservas.map(reservas=>{
                                return(
                                    <TableItem
                                    key={reservas.id}
                                    reservas={reservas}
                                    >
                                    </TableItem>
                                )
                            })
                        }
                    </tbody>
            </table>
          
        </div>
    )
}
