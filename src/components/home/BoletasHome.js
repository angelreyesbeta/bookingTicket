import React, {useEffect, useState } from 'react'
import { config } from '../../helpers/config'
import { getBoletas } from '../../helpers/getBoletas'
import { CardsItems } from './CardsItems'

export const BoletasHome = () => {

        
    const [dataBoletas, setDataBoletas] = useState([])
    const colores=['primary','success','danger','warning','dark','info'];
    
    const ListBoletas=()=>{
        getBoletas(config.urlBoletas)
        .then((boletas)=>{
            setDataBoletas(boletas)
            
        })
    }
    
    useEffect(() => {
        ListBoletas();
       
       
    },[setDataBoletas])

    return (
        <>
       <div className="container mt-5">
           <div className="row">
                {
                    (dataBoletas.length===0)
                    ?
                      <h1 className="center-text">No Hay Registros</h1>
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
