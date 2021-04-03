
const initialStateReservas={
    loading:true,
    error:'',
    dataReservas:{},
}

const reservaReducer=(state,action)=>{

    switch (action.type) {
        case 'listarReservas':
            return{
                loading:false,
                error:'',
                dataReservas:action.payload
            }
        case 'Fetch error':
            return{
                loading:false,
                error:'Error en la api',
                dataReservas:{}
            }
        default:
            return state;
    }

}

export {initialStateReservas};
export default reservaReducer;