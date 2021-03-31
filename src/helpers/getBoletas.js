export const  getBoletas=async(url)=>{
        
        const resp=await fetch(url);
        const datos=await resp.json();
    
        const boletas=datos.map(boleta => {
            return{
                id: boleta.id,
                description: boleta.description,
                cantidad: boleta.cantidad
            }
        })


   

   
    return boletas;
}

