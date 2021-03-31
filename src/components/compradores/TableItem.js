import React, { useState } from 'react'

export const TableItem = ({compradores,parametro,seleccionarComprador}) => {
    
   const [state] = useState(parametro)
   
   const hanledClic=(e)=>{
       e.preventDefault();
       seleccionarComprador(compradores.id,compradores.name);
   }

   let botton;
   if(state){
       botton=<button onClick={hanledClic} className="btn btn-primary">Seleccionar</button>;
   }else{
       botton=null/* [<button className="btn btn-primary">Edit</button>," ",
       <button className="btn btn-danger">Delete</button>] */
   }
 

    return (
        <>  
            <tr>
                <td>{compradores.id}</td>
                <td>{compradores.name}</td>
                <td>{compradores.identification}</td>
                <td>{compradores.phone}</td>
                {botton&&(
                <td>
                   {botton}
                </td>
                )
                }
            </tr>

            
        </>
    )
}
