
const initialStateCompradores={
    loading:true,
    error:'',
    dataCompradores:{},
   
}



const compradoresReducer=(state={},action)=>{

    switch (action.type) {
        case 'listarCompradores':
            return{
                loading:false,
                error:'',
                dataCompradores:action.payload
            }
        case 'Fetch error':
            return{
                loading:false,
                error:'Error en la api',
                dataCompradores:{}
            }
        default:
            return state;
    }

}

export {initialStateCompradores};
export default compradoresReducer;