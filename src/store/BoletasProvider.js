import React, { createContext,useReducer } from "react";
import { useFetchBoletas } from "../hook/useFetchBoletas";
import boletaReducer from "../reducer/boletaReducer";


const BoletaContex=createContext()


const BoletasProvider=({children})=>{

    const {data}=useFetchBoletas();
   


    
    const [boletas, dispatch] = useReducer(boletaReducer,data)
    
    return(
        <BoletaContex.Provider value={
            [boletas,dispatch]
        }
        >
            {children}
        </BoletaContex.Provider>
    )
}

export {BoletaContex}
export default BoletasProvider
