import React, { useContext, useEffect, useCallback } from 'react'
import { config } from '../../helpers/config'
import { getBoletas } from '../../helpers/getBoletas'
import { StoreContex } from '../../store/Store'
import { CardsItems } from './CardsItems'

export const BoletasHome =() => {

    //const [dataBoletas, setDataBoletas] = useState({})
    //const [loading, setBandera] = useState(true)

    const {boletas,dispatch} = useContext(StoreContex)
    const {loading,dataBoletas}=boletas;
    const colores=['primary','success','danger','warning','dark','info'];
    //const colores=['primary','success'];

    const ListBoletas=useCallback(()=>{
        getBoletas(config.urlBoletas)
        .then(boletas=>{
            dispatch({type:'listarBoletas', payload:boletas})
        })
    },[dispatch])
     
    useEffect(() => {
        ListBoletas(); 
       
    },[ListBoletas]) 
 
 

    return (
        <>
       <div className="container mt-5">
           <div className="row">
                 {
                    (loading)
                    ?
                      <h3 className="center-text">Cargando data...</h3>
                    :
                    dataBoletas.map(boleta=>{
                        return(
                            <CardsItems
                                key={boleta.id}
                                boletas={boleta}
                                colors={colores[Math.floor(Math.random() * colores.length) ]}
                             >
                            </CardsItems>
                           
                        )
                        
                    })
                } 
                
           </div>
       
       </div>

        </>
    )
}
