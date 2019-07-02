import { Socket } from "socket.io";
import { Usuario } from '../classes/usuarios';
import { usuariosLista } from '../classes/usuarios-lista'
export const usuariosConectados= new usuariosLista();


//para desconectar
export const desconectar=(cliente:Socket,io:SocketIO.Server)=>{
    cliente.on('disconnect',()=>{
        console.log("se desconectto un cliente")
    })
}
export const loginWS= (cliente:Socket,io:SocketIO.Server)=>{
    cliente.on('configurar-usuario',(payload:{nombre:string,empresa:string},callback:Function)=>{
        //ingreso al cliente 
        const usuario=new Usuario(cliente.id);
        usuariosConectados.agregarUsuario(usuario);
        //ahora le coloco el nombre
        let nombre="";
        let idapp:any;
        let respuesta:any;
        let ok:any;
        if(payload.empresa==="app-mensajes"){
            nombre="app-mensaje"
        }else{
            nombre=payload.nombre;
            idapp=usuariosConectados.getUsuarioNombre('app-mensaje');
            if(idapp===undefined){
                ok=false;
                respuesta="Sin servicio para sms favor de esperar, estamos realizando actualizaciones, Gracias!."
            }else{
                ok=true;
                respuesta=idapp.id
            }
        }
        
        usuariosConectados.actualizarNombre(cliente.id,nombre);
        //le regreso al cliente que se configuro le devuelvo la conficuracion lista
        console.log("configurando",payload.nombre);
        //Retorno que el mensje para el usuario que se configuro
        callback({
            ok,
            idaapmensajes:respuesta
        })
        
        
    })
}
export const mandarsms=(cliente:Socket,io:SocketIO.Server)=>{
    cliente.on("mandar-sms",(payload:{numero:string,clave:string,idempresa:string,tipo:string},callback:Function)=>{
        //primero reviso si la app de mesajes esta disponible si no le digo que no hay servicio
        let idapp:any;
        let respuesta:any;
        let ok:any;
        //obtengo el id de la app-de mensajes
        idapp=usuariosConectados.getUsuarioNombre('app-mensaje');
        if(idapp===undefined){
            ok=false;
            respuesta="Sin servicio para sms favor de esperar, estamos realizando actualizaciones, Gracias!."
        }else{
            ok=true;
            respuesta="espera"
            const enviarsms={
                numero:payload.numero,
                idempresa:payload.numero,
                clave:payload.clave,
                tipo:payload.tipo,
                idcliente:cliente.id
            }
            console.log(enviarsms);
            
            //le mando a la app de mensajes el numero y el id de la empresa para que cambie la contraseña y le mande una
            io.to(idapp.id).emit("mandar-sms",enviarsms);
        }
        
        console.log("mandarsms")
        callback({
            ok,respuesta
        })
    })
}
export const respuestasms=(cliente:Socket,io:SocketIO.Server)=>{
    cliente.on("respuestasms",(payload:{idcliente:any,respuesta:any,idempresa:any})=>{
        const idcliente= payload.idcliente;
        const respuestasms={
            idempresa:payload.idempresa,
            respuesta:payload.respuesta
        }
        io.to(idcliente).emit("respuesta-sms",respuestasms);
    })
}