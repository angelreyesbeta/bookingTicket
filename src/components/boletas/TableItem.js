import React from 'react'





export const TableItem = ({boletas}) => {
    
   

    return (
        <>  
            <tr>
                <td>{boletas.id}</td>
                <td>{boletas.description}</td>
                <td>{boletas.cantidad}</td>
                
            </tr>


            
        </>
    )
}
