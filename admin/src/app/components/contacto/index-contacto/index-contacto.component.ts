import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-index-contacto',
  templateUrl: './index-contacto.component.html',
  styleUrls: ['./index-contacto.component.css']
})
export class IndexContactoComponent implements OnInit {

  public mensajes : Array<any>=[];
  public load_data = true;
  public page = 1;
  public pageSize = 20;
  public filtro='';
  public token;

  constructor(
    private _adminService : AdminService
  ) { 

    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {

    this.obtener_mensajes_admin();


  }


  obtener_mensajes_admin()
  {
    this._adminService.obtener_mensajes_admin(this.token).subscribe(
      response =>  {
        this.mensajes = response.data;

        this.load_data = false;
      },
      error => {
        console.log(error)
      }
    )
  }

  cerrar(id:any)
  {
    this._adminService.cerrar_mensaje_admin(id,{data:undefined},this.token).subscribe(
      response  =>{
        
        console.log(response);
        iziToast.show({
          title: 'Success',
          titleColor: '#1DC74C',
          class: 'text-success',
          color:'#FFF',
          position: 'topRight',
          message:'Mensaje cerrado correctamente'
    });

    $('#estadomodal-'+id).modal('hide');
    $('.modal-backdrop').removeClass('show');

    this.reloadCurrentPage()
    

      },
      error  => {
        console.log(error);
      }
    )

  }

  reloadCurrentPage()
  {
    window.location.reload()
  }


}
