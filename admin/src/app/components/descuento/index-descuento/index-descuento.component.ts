import { Component, OnInit } from '@angular/core';
import { DescuentoService } from 'src/app/services/descuento.service';
import { GLOBAL } from 'src/app/services/GLOBAL';



declare var iziToast: any;
declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-index-descuento',
  templateUrl: './index-descuento.component.html',
  styleUrls: ['./index-descuento.component.css']
})
export class IndexDescuentoComponent implements OnInit {

  public page = 1;
  public pageSize = 20;
  public load_data = true;
  public filtro = "";
  public token;
  public descuentos: Array<any> = [];

  public url;

  constructor(

    private _descuentoService : DescuentoService

  ) {

    this.token = localStorage.getItem('token');
    this .url = GLOBAL.url;
   }

  ngOnInit(): void {
    this.obtener_descuentos_admin();
  }

  filtrar()
  {
    if(this.filtro){

      this.obtener_descuentos_admin();

    }else {
      iziToast.show({
        title: 'Error',
        titleColor: 'FF0000',
        class: 'text-danger',
        color:'red',
        position: 'topRight',
        message:'Ingrese un nombre de producto para buscar'
    });

    }

  }


  reset()
  {
    this.obtener_descuentos_admin();
  }


  obtener_descuentos_admin()
  {
    this._descuentoService.listar_descuentos_admin(this.filtro,this.token).subscribe(
      response  => {
        this.descuentos = response.data;

        this.descuentos.forEach(element  =>
          {
            var tt_inicio = Date.parse(element.fecha_inicio+"T00:00:00")/1000;
            var tt_fin = Date.parse(element.fecha_fin+"T00:00:00")/1000;

            var today = Date.parse(new Date().toString())/1000;

            
            if(today > tt_inicio)
            {
              element.estado = 'Expirado';
            }
            if(today < tt_inicio )
            {
              element.estado = 'Próximamente';
            }
            if(today >= tt_inicio && today <= tt_fin )
            {
              element.estado = 'En progreso';
            }
          });


        this.load_data = false;


      },
      error  => {
        console.log(error);
      }
    )

    this.filtro = "";
  }



  eliminar(id:any)
  {
    this._descuentoService.eliminar_descuento_admin(id,this.token).subscribe(
      response  =>{
        
        console.log(response);
        iziToast.show({
          title: 'Success',
          titleColor: '#1DC74C',
          class: 'text-success',
          color:'#FFF',
          position: 'topRight',
          message:'Producto eliminado correctamente'
    });

    $('#delete-' + id).modal('hide');
    $('.modal-backdrop').removeClass('show');
    this.reloadCurrentPage();
      

    

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