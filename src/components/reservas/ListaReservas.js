import React, { useCallback, useContext, useEffect, useState    } from 'react'
import { config } from '../../helpers/config'
import {getReservas} from '../../helpers/getReservas'
import { StoreContex } from '../../store/Store'
import { TableItem } from './TableItem'
import DataTable from 'react-data-table-component';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import { useForm } from '../../hook/useForm'

const columnas=[
    {
        name:'ID',
        selector:'id',
        sortable:true
    },
    {
        name:'BOLETA',
        selector:'boleta',
        sortable:true
    },
    {
        name:'COMPRADOR',
        selector:'comprador',
        sortable:true
    },
    {
        name:'CANTIDAD',
        selector:'cantidad',
        sortable:true
    }
]

const paginationOptions={
    rowPerPageText:'Filas por pagina',
    rangeSuperatorText:'de',
    selectAllRowsItem:true,
    selectAllRowsItemText:'todos'
}


export const ListaReservas = () => {
    
    const [formValues,handleInputChange,reset]=useForm({
        busqueda:''
    });
    const{busqueda}=formValues;

    const {reservas,dispatchReservas} = useContext(StoreContex)
    const {loading,dataReservas}=reservas;
    
    const ListReservas=useCallback(()=>{
        getReservas(config.urlReservas)
             .then(reservas=>{
                dispatchReservas({
                    type:'listarReservas', 
                    payload:reservas
                })
               
             }   
            ) 
    },[dispatchReservas])
    
    useEffect(() => {
        ListReservas();
    },[ListReservas])
  
    const filtrarElemento=(e)=>{
        e.preventDefault();
       
        const search=dataReservas.filter(item=>{
            if(item.boleta.includes(busqueda) ||
               item.comprador.normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(busqueda)){
                return item;
            }
        })

        dispatchReservas({
            type:'listarReservas', 
            payload:search
        })
    }
   
    
    return (
        <div className="container">
            {

                loading?<h3>Cargando data</h3>:
            
               <div className="table-reponsive">
                   <div className="barraBusqueda">
                        <input
                        type="text"
                        placeholder="Buscar"
                        className="textField"
                        name="busqueda"
                        value={busqueda}
                        onChange={handleInputChange}
                        />
                        <button 
                            type="button" 
                            className="btnBuscar"
                            onClick={filtrarElemento}
                        >
                        {" "}
                        <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                    <DataTable
                    className="table"
                    columns={columnas}
                    data={dataReservas}
                    title="Listado de reservas"
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="600px"
                    paginationComponentOptions={paginationOptions}
                    noDataComponent={<span>No se encontró nada</span>}
                    />
                </div>
                
                    /* <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>ID BOLETA</th>
                                <th>ID COMPRADOR</th>
                                <th>CANTIDAD</th>
                            </tr>
                        </thead>
                            <tbody>
                                {
                                    dataReservas.map(reservas=>{
                                        return(
                                            <TableItem
                                            key={reservas.id}
                                            reservas={reservas}
                                            >
                                            </TableItem>
                                        )
                                    })
                                }
                            </tbody>
                    </table> */
            }
          
        </div>
    )
}
