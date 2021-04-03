
const initialState={
    loading:true,
    error:'',
    dataBoletas:{},
    colors:['primary','success','danger','warning','dark','info']
}



const boletaReducer=(state={},action)=>{

    switch (action.type) {
        case 'listarBoletas':
            return{
                loading:false,
                error:'',
                dataBoletas:action.payload
            }
        case 'Fetch error':
            return{
                loading:false,
                error:'Error en la api',
                dataBoletas:{}
            }
        default:
            return state;
    }

}

export {initialState};
export default boletaReducer;