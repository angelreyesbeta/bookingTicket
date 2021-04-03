import React, { useState, useEffect, useContext, useCallback } from 'react'
import {getBoletas} from '../../helpers/getBoletas'
import { TableItem } from './TableItem'
import {Modal,ModalFooter,ModalBody,ModalHeader} from 'reactstrap'
//import postCompradores from '../../helpers/postCompradores'
import { useForm } from '../../hook/useForm';
import axios from "axios";
import { config } from '../../helpers/config';
import { StoreContex } from '../../store/Store';


export const BoletasList = () => {
    const {boletas,dispatch} = useContext(StoreContex)
    const {loading,dataBoletas}=boletas;
    const [modalInsertar, setModalInsertar] = useState(false)
    const [msgError, setMsgError]=useState(null);
    const [msgsuccessful, setMsgSuccessful]=useState(null);

    //recibo la data de boletas

    const ListBoletas=useCallback(()=>{
        getBoletas(config.urlBoletas)
             .then(boletas=>{
                dispatch({type:'listarBoletas', payload:boletas})             
            })
    },[dispatch])
    
    useEffect(() => {
        ListBoletas();
       
    },[ListBoletas])

    const changeStatusModal=()=>{
        setModalInsertar(!modalInsertar);
        clean();
    }

    const [formValues,handleInputChange,reset]=useForm({
        description:'',
        cantidad:''
    });

    const clean=()=>{
        reset();
        setMsgError(null);
        setMsgSuccessful(null)
    }

    const{description,cantidad}=formValues;

    const postBoletas=async()=>{
        return await axios.post(config.urlBoletas,formValues)
        .then(response=>{
            setMsgSuccessful('Ingreso Exitoso')
            setMsgError(null)
            ListBoletas();
            reset();
        }).catch(error=>{
            setMsgError(error.message)
            setMsgSuccessful(null)
        })
    }


    const hanledClickPostCompradores=(e)=>{
        e.preventDefault();
        if(isFormValid()){

            postBoletas();
        }
       
    }

    const isFormValid=()=>{

        if(description.length<=7){
            setMsgError('Debes ingresar un Descricción correcta')
            setMsgSuccessful(null)
            return false;
        }else if(cantidad.length<1){
            setMsgError('Debes ingresar una cantidad validad')
            setMsgSuccessful(null)
            return false;
        }
        
        return true;
    }


   

    
    return(

        <>
        
        <div className="container mt-5">
           {
                loading?<h3>Cargando data</h3>:
                <>
                <button className="btn btn-success mb-3" onClick={changeStatusModal}><strong>Agregar Boleta</strong></button>
                <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Descricción</th>
                        <th>cantidad</th>
                    </tr>
                </thead>
                    <tbody>
                            {
                                
                            dataBoletas.map(boletas=>{
                                return(
                                    <TableItem
                                    key={boletas.id}
                                    boletas={boletas}
                                    changeStatusModal={changeStatusModal}
                                    modalInsertar={modalInsertar}
                                    >
                                    </TableItem>
                                )
                            })
                        }
                    </tbody>
            </table>
            </>
           }
          
        </div>

        <Modal isOpen={modalInsertar}>
                <ModalHeader style={{display:'block'}}>
                    
                    <span style={{float:'left'}}><h4>Registro de Boletas</h4></span>
                    <span style={{float:'right'}} onClick={changeStatusModal}>x</span>
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
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
                    
                        
                        <label htmlFor="description">Descripcción</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            name="description" 
                            id="description"
                            value={description}
                            onChange={handleInputChange}
                            />
                            
                        <br/>
                        <label htmlFor="cantidad">Cantidad</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            name="cantidad" 
                            id="cantidad"
                            value={cantidad}
                            onChange={handleInputChange}
                            />
                                           
                    </div>
                </ModalBody>
                <ModalFooter>
                        <button className="btn btn-success" onClick={hanledClickPostCompradores}>Insertar</button>
                        <button className="btn btn-danger" onClick={changeStatusModal}>Cancelar</button>
                </ModalFooter>
            </Modal>
        </>
    )
    
}
