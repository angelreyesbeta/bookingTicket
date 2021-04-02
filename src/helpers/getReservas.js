export const  getReservas=async(url)=>{
        
    const resp=await fetch(url);
    const {reservas}=await resp.json();

    const reservasList=reservas.map(reserva => {
        return{
            id: reserva.id,
            comprador:reserva.comprador.name,
            boleta:reserva.boleta.description,
            cantidad:reserva.cantidad
        }
    })

return reservasList;
}

