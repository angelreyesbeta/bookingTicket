import { useState, useEffect } from 'react'
import { config } from '../helpers/config';
import {getBoletas} from '../helpers/getBoletas';


export const useFetchBoletas = () => {

    const [state, setstate] = useState({
        data:[]
    });


    useEffect(()=>{

        getBoletas(config.urlBoletas)
            .then(boletas=>{
                setstate({
                    data:boletas
                })
                                
            })

    },[])


    return state;
   
}
