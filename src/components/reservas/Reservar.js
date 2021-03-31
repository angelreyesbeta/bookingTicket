import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { config } from '../../helpers/config';
import { useForm } from '../../hook/useForm';
import { CompradoresList } from '../compradores/CompradoresList';

export const Reservar = ({history}) => {
    const {boletaId,boletaDescri,boletaCantidad}=useParams();
    const [msgError, setMsgError]=useState(null);
    const [dataCantidad, setDataCantidad] = useState(boletaCantidad)
    const [msgsuccessful, setMsgSuccessful]=useState(null);
    const [compradorSeleccionado, setCompradorSeleccionado] = useState({
        id_comprador:'',
        name:''
    })

    const [actiForm, setActiForm] = useState(false)

    const [formValues,handleInputChange]=useForm({
        cantidad:''
    });

    const{cantidad}=formValues;

    const seleccionarComprador=(id_comprador,name)=>{
          setCompradorSeleccionado({id_comprador,name})
          
          setActiForm(true);
          
    }

    const postReserva=async(reserva)=>{
        if(reserva.cantidad>dataCantidad){
            setMsgError("Cantidad superada")
            setMsgSuccessful(null)
        }else
        return await axios.post(config.urlReservas,reserva)
        .then(response=>{
            setMsgSuccessful('Ingreso Exitoso')
            setDataCantidad(dataCantidad-reserva.cantidad)
            setMsgError(null)
        }).catch(error=>{
            setMsgError(error.message)
            setMsgSuccessful(null)
            
        })
       
    }


    const hanledClickPostReservas=(e)=>{
        e.preventDefault();
        
        const reserva={
            id_boleta:boletaId,
            id_comprador:compradorSeleccionado.id_comprador,
            cantidad
        }
        if(isFormValid()){
          
           postReserva(reserva);
        }
       
    }

    const isFormValid=()=>{

        if(cantidad.length<=0){
            setMsgError('Debes ingresar una cantidad Valida')
            setMsgSuccessful(null)
            return false;
        }
        
        return true;
    }
  
    
    return (
   
        <>
        
        <div className="container mt-3">
        {
            msgError&&(
             <div className="alert alert-danger" role="alert">
                 {msgError}
             </div>
            )
        }
        {
                           
         msgsuccessful&&(
             <div className="alert alert-success" role="alert">
                 {msgsuccessful}
             </div>
         )
        }
            <Link to="/">
            <button 
                className="btn btn-info"
                style={{float:'right'}}       
                >
               Return
            </button>
            </Link>
            
            <h4>Reservar <strong>{boletaDescri}</strong></h4>
            <h4>Disponibilidad <strong>{dataCantidad}</strong></h4>
            <div className="row">
                <div className="col-lg-6">
                 <h4>Comprador <strong>{compradorSeleccionado.name}</strong></h4>
                </div>
                {
                    actiForm&&(
                <div className="col-lg-6">

                 <div className="col-lg-6">

                 <div className="form-group">               
                        <input 
                            className="form-control" 
                            type="number" 
                            required
                            name="cantidad" 
                            id="cantidad"
                            value={cantidad}
                            onChange={handleInputChange}
                            placeholder="Cantidad..."
                            />             
                    </div>
                 </div>
                    <div className="col-lg-6">
                        <button 
                            className="btn btn-dark"
                            onClick={hanledClickPostReservas}
                        >Reservar</button>
                    </div>
                </div>

                    )
                }

            </div>
            
            <CompradoresList
              parametro={true}
              seleccionarComprador={seleccionarComprador}
            />
            

            
            
        </div>
        </>
    )
}
