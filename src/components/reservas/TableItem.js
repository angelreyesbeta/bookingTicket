import React from 'react'





export const TableItem = ({reservas}) => {
    
   

    return (
        <>  
            <tr>
                <td>{reservas.id}</td>
                <td>{reservas.boleta}</td>
                <td>{reservas.comprador}</td>
                <td>{reservas.cantidad}</td>
                
            </tr>


            
        </>
    )
}
