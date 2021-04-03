import React, { createContext,useReducer } from "react";
import boletaReducer, { initialState } from "../reducer/boletaReducer";
import compradoresReducer, { initialStateCompradores } from "../reducer/compradoresReducer";
import reservaReducer, { initialStateReservas } from "../reducer/reservasReducer";

const StoreContex=createContext()

const Store=({children})=>{


    const [boletas, dispatch] = useReducer(boletaReducer,initialState)
    const [reservas, dispatchReservas] = useReducer(reservaReducer,initialStateReservas)
    const [compradores, dispatchCompradores] = useReducer(compradoresReducer,initialStateCompradores)
    
    return(
        <StoreContex.Provider value={{
            boletas, dispatch,
            reservas, dispatchReservas,
            compradores,dispatchCompradores
        }}
        
        >
            {children}
        </StoreContex.Provider>
    )
}

export {StoreContex}
export default Store
