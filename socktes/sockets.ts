import { Socket } from "socket.io";


//para desconectar
export const desconectar=(cliente:Socket)=>{
    cliente.on('disconnect',()=>{
        console.log("se desconectto un cliente")
    })
}
export const loginWS= (cliente:Socket)=>{
    cliente.on('configurar-usuario',(payload:{nombre:string,empresa:string})=>{
        console.log('configuarar usario',payload);
    })
}

