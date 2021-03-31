export const  getCompradores=async(url)=>{
        
    
    const resp=await fetch(url);
    const datos=await resp.json();

    const compradores=datos.map(comprador => {
        return{
            id: comprador.id,
            name: comprador.name,
            identification: comprador.identification,
            phone: comprador.phone
        }
    })

    return compradores;
}

