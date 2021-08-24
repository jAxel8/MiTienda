import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";



@Injectable({
  providedIn: 'root'
})
export class GuestService {

  public url ;

  constructor(

    private _http : HttpClient

  ) {

    this.url = GLOBAL.url;
   }


   obtener_producto_slug_publico(slug:any): Observable<any>
{
  let headers = new HttpHeaders().set('Content-Type','application/json');



 return this._http.get(this.url + 'obtener_producto_slug_publico/'+slug,{headers:headers});
}

listar_productos_recomendados_publico(categoria:any): Observable<any>
{
  let headers = new HttpHeaders().set('Content-Type','application/json');



 return this._http.get(this.url + 'listar_productos_recomendados_publico/'+categoria,{headers:headers});
}

listar_productos_nuevos_publico(): Observable<any>
{
  let headers = new HttpHeaders().set('Content-Type','application/json');



 return this._http.get(this.url + 'listar_productos_nuevos_publico/',{headers:headers});
}

listar_productos_masvendidos_publico(): Observable<any>
{
  let headers = new HttpHeaders().set('Content-Type','application/json');



 return this._http.get(this.url + 'listar_productos_masvendidos_publico/',{headers:headers});
}


get_estados(): Observable<any>
{
  

  return this._http.get('./assets/estados.json');

}

get_municipios(): Observable<any>
{
  

  return this._http.get('./assets/municipios.json');

}

get_envios(): Observable<any>
{
  

  return this._http.get('./assets/envios.json');

}


obtener_descuento_activo(): Observable<any>
{
  let headers = new HttpHeaders().set('Content-Type','application/json');



 return this._http.get(this.url + 'obtener_descuento_activo/',{headers:headers});
}




enviar_mensaje_contacto(data:any): Observable<any>
{
  let headers = new HttpHeaders().set('Content-Type','application/json');



 return this._http.post(this.url + 'enviar_mensaje_contacto',data,{headers:headers});
}



}
