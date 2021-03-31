export const  getReservas=async(url)=>{
        
    const resp=await fetch(url);
    const datos=await resp.json();

    const reservas=datos.map(reserva => {
        return{
            id: reserva.id,
            id_boleta: reserva.id_boleta,
            id_comprador: reserva.id_comprador,
            cantidad:reserva.cantidad
        }
    })





return reservas;
}

