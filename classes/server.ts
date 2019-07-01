import  express  from "express";
import { SERVER_PORT } from '../globals/environment';
import socketIO from 'socket.io'
import http from 'http';
import * as mi_socket from '../socktes/sockets'

export default class Server {
    
    private static _instance:Server;

    public app:express.Application;
    public port:number;

    //propiedad encargada de sockets 
    public io:SocketIO.Server;
    private httpServer:http.Server;

    private constructor(){
        this.app =express();
        this.port = SERVER_PORT;
        this.httpServer=new http.Server(this.app);
        this.io=  socketIO(this.httpServer);
        this.escucharSockte();
    }
    public static get instance(){
        return this._instance||(this._instance = new this());
    }
    //funcion para escuchar el sockter
    private escucharSockte(){
       
        console.log("en escucha")
        this.io.on('connection',cliente=>{
            console.log("cliente conectado");
            //desconectar
            mi_socket.desconectar(cliente);
            mi_socket.loginWS(cliente);
        })
    }
    start(callback:()=>void){
        this.httpServer.listen(this.port,callback);
    }
    
}