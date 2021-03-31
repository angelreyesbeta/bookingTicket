import React from 'react'





export const TableItem = ({reservas}) => {
    
   

    return (
        <>  
            <tr>
                <td>{reservas.id}</td>
                <td>{reservas.id_boleta}</td>
                <td>{reservas.id_comprador}</td>
                <td>{reservas.cantidad}</td>
                
            </tr>


            
        </>
    )
}
