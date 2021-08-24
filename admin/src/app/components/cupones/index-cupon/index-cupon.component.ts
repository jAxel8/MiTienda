import { Component, OnInit } from '@angular/core';
import { CuponService } from 'src/app/services/cupon.service';

declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-index-cupon',
  templateUrl: './index-cupon.component.html',
  styleUrls: ['./index-cupon.component.css']
})
export class IndexCuponComponent implements OnInit {

  public cupones : Array<any>=[];
  public load_data = true;
  public page = 1;
  public pageSize = 20;
  public filtro='';
  public token;


  constructor(
    private _cuponService : CuponService

  ) {

    this.token = localStorage.getItem('token');
   }

  ngOnInit(): void {

    this.listar_cupones_admin();
  }



  listar_cupones_admin()
  {
    this._cuponService.listar_cupones_admin(this.filtro,this.token).subscribe(
      response  => {
        this.cupones = response.data;
        this.load_data = false;
      },
      error  => {
        console.log(error);
      }
    )
  }

  filtrar()
  {
    this.listar_cupones_admin();
  }



  eliminar(id:any)
  {
    this._cuponService.eliminar_cupon_admin(id,this.token).subscribe(
      response  =>{
        
        console.log(response);
        iziToast.show({
          title: 'Success',
          titleColor: '#1DC74C',
          class: 'text-success',
          color:'#FFF',
          position: 'topRight',
          message:'Cupòn eliminado correctamente'
    });

    $('#delete-' + id).modal('hide');
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


  
