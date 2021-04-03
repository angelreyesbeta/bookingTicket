import React, { useCallback, useContext, useEffect    } from 'react'
import { config } from '../../helpers/config'
import {getReservas} from '../../helpers/getReservas'
import { StoreContex } from '../../store/Store'
import { TableItem } from './TableItem'

export const ListaReservas = () => {

    const {reservas,dispatchReservas} = useContext(StoreContex)
    const {loading,dataReservas}=reservas;

    const ListReservas=useCallback(()=>{
        getReservas(config.urlReservas)
             .then(reservas=>{
                dispatchReservas({
                    type:'listarReservas', 
                    payload:reservas
                })
             }   
            ) 
    },[dispatchReservas])
    
    useEffect(() => {
        ListReservas();
    },[ListReservas])
    
    return (
        <div className="container mt-5">
            {

                loading?<h3>Cargando data</h3>:
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
            }
          
        </div>
    )
}
