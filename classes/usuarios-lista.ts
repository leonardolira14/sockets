import { Usuario } from "./usuarios";



export class usuariosLista{
    private lista:Usuario[]=[];
    constructor(){

    } 
    public agregarUsuario(usuario:Usuario){
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }  
    public actualizarNombre(id:string,nombre:string){
        this.lista.forEach((usuario)=>{
            if(usuario.id===id){
                usuario.nombre=nombre;
              return;
            }
        })
        console.log("=====actulizando nombre===");
        console.log(this.lista);
    } 
    public getLista(){
        return this.lista.filter(usuario=>usuario.nombre!=="sin-nombre");
    }
    public getUsuario(id:string){
        return this.lista.find(usuario=>usuario.id==id);
    }
    public getUsuarioNombre(nombre:string){
        return this.lista.find(usuario=>usuario.nombre == nombre);
    }
    public getUsuarioSala(sala:string){
        return this.lista.find(usuario=>usuario.sala==sala);
    }
    public deleteUsuario(id:string){
        const tempUsuario=this.getUsuario(id);
        this.lista=this.lista.filter(usuario=>usuario.id!==id);
        console.log(this.lista);
        return tempUsuario;
    }
}