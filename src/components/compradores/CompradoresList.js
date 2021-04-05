import React, { useState, useEffect, useContext, useCallback } from 'react'
import {getCompradores} from '../../helpers/getCompradores'
import { TableItem } from './TableItem'
import {Modal,ModalFooter,ModalBody,ModalHeader} from 'reactstrap'
import { useForm } from '../../hook/useForm';
import axios from "axios";
import { config } from '../../helpers/config';
import { StoreContex } from '../../store/Store';


export const CompradoresList = ({parametro,seleccionarComprador}) => {
    const {compradores,dispatchCompradores} = useContext(StoreContex)
    const {dataCompradores,loading}=compradores;
    //const [dataCompradores, setDataCompradores] = useState([])
    const [modalInsertar, setModalInsertar] = useState(false)
    const [msgError, setMsgError]=useState(null);
    const [msgsuccessful, setMsgSuccessful]=useState(null);

    const [formValues,handleInputChange,reset]=useForm({
        name:'',
        identification:'',
        phone:''
    });

    const clean=()=>{
        reset();
        setMsgError(null);
        setMsgSuccessful(null)
    }

    const{name,identification,phone}=formValues;

    const postCompradores=async()=>{

        let json=JSON.stringify(formValues);
        let params='json='+json;        
        return await axios.post(config.urlCompradores,params)
        .then(response=>{
            if(response.data.status==="success"){
                setMsgSuccessful('Ingreso Exitoso')
                setMsgError(null)
                ListCompradores();
                reset();
            }else if(response.data.status==="error"){
                setMsgError(response.data.message)
                setMsgSuccessful(null);
            }
        }).catch(error=>{
            setMsgError(error.message)
            setMsgSuccessful(null)
        })

        
    }


    const hanledClickPostCompradores=(e)=>{
        e.preventDefault();
        if(isFormValid()){

           postCompradores();
        }
       
    }

    const isFormValid=()=>{

        if(name.length<=2){
            setMsgError('Debes ingresar un Nombre Valido')
            setMsgSuccessful(null)
            return false;
        }else if(identification.length<5){
            setMsgError('Debes ingresa una Identificación validad')
            setMsgSuccessful(null)
            return false;
        }
        
        return true;
    }

 




    const ListCompradores=useCallback(()=>{
        getCompradores(config.urlCompradores)
             .then(compradores=>{
                 dispatchCompradores({
                     type:'listarCompradores',
                     payload:compradores
                 })
                
            })
    },[dispatchCompradores])
    
    useEffect(() => {
        ListCompradores();
       
    },[ListCompradores])

    const changeStatusModal=()=>{
        setModalInsertar(!modalInsertar);
        clean();
    }

   

    
    return(

        <>
        <div className="container mt-5">
            {
                 loading?<h3>Cargando data</h3>:
                 <>
                 <button className="btn btn-success mb-3" onClick={changeStatusModal}><strong>Agregar Comprador</strong></button>
            <div className="table-responsive-sm">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Identificación</th>
                            <th>Telefono</th>
                            {parametro&&(

                                <th>Acciones</th>
                            )
                            }
                        </tr>
                    </thead>
                        <tbody>
                            {
                            
                                dataCompradores.map(comprador=>{
                                    
                                    return(
                                        <TableItem
                                        key={comprador.id}
                                        compradores={comprador}
                                        parametro={parametro}
                                        seleccionarComprador={seleccionarComprador}
                                        >
                                        </TableItem>
                                    )
                                })
                            
                            }
                        </tbody>
                </table>
            </div>
                 </>
            }
        </div>
        <Modal isOpen={modalInsertar}>
                <ModalHeader style={{display:'block'}}>
                    
                    <span style={{float:'left'}}><h4>Registro de Compradores</h4></span>
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
                    
                        
                        <label htmlFor="name">Nombre</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            name="name" 
                            id="name"
                            value={name}
                            onChange={handleInputChange}
                            />
                            
                        <br/>
                        <label htmlFor="identification">Identificación</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            name="identification" 
                            id="identification"
                            value={identification}
                            onChange={handleInputChange}
                            />
                        <br/>
                        <label htmlFor="phone">Teléfono</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            name="phone" 
                            id="phone"
                            value={phone}
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
