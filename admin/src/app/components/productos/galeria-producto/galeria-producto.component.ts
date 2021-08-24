import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';
import { v4 as uuidv4 } from 'uuid';

declare var jQuery:any;
declare var $: any;
declare var iziToast:any;

@Component({
  selector: 'app-galeria-producto',
  templateUrl: './galeria-producto.component.html',
  styleUrls: ['./galeria-producto.component.css']
})
export class GaleriaProductoComponent implements OnInit {

  public producto : any = {};

  public token;
  public id: any;

  public file :any
  public imgSelect: any | ArrayBuffer = 'assets/img/01.jpg';

  public load_btn = false;

  public url;


  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService
   ) { 
     this.token = localStorage.getItem('token');
     this.url = GLOBAL.url;
     this.obtener_producto_admin()
   }

  ngOnInit(): void {

    
  }

  actualizar()
  {

  }

  subir_imagen()
  {

    if(this.file != undefined){

      let data = {
        imagen : this.file,
        _id: uuidv4()
      }

      console.log(data);
      this._productoService.agregar_imagen_galeria_admin(this.id,data,this.token).subscribe(
        response => {
          $('#input-img').val('');
          this.obtener_producto_admin();
        },

        error => {
          console.log(error)
        }


      )





    }else{
      iziToast.show({
        title: 'Error',
        titleColor: 'FF0000',
        class: 'text-danger',
        color:'red',
        position: 'topRight',
        message:'Debe seleccionar una imagen para subir.'
    });

    }

  }

  obtener_producto_admin()
  {
    this._route.params.subscribe(
      params  => {
        this.id = params['id'];
        console.log(this.id);
        this._productoService.obtener_producto_admin(this.id,this.token).subscribe(
          response  => {
            if(response.data == undefined)
            {

              this.producto = undefined;

            }else{
              this.producto = response.data;

            }

            console.log(this.producto);
          },
          error  => {
            console.log(error)
          }
        )
      }

    )
  }

  fileChangeEvent(event:any):void
{
   var file : any;
   if(event.target.files  && event.target.files[0]){

    file = <File>event.target.files[0];


   } else{
    iziToast.show({
      title: 'Error',
      titleColor: 'FF0000',
      class: 'text-danger',
      color:'red',
      position: 'topRight',
      message:'No hay una imagen.'
  });

   }

   if(file.size  <= 8000000){

    if(file?.type== 'image/png' || file?.type == 'image/web' || file?.type == 'image/jpg' || file?.type == 'image/gif' || file?.type == 'image/jpeg')
    {

      this.file = file; 

    }else{
      iziToast.show({
        title: 'Error',
        titleColor: 'FF0000',
        class: 'text-danger',
        color:'red',
        position: 'topRight',
        message:'El archivo debe ser una imagen'
    });
    $('#input-img').val('');
    this.file = undefined;
    }

   }else{
    iziToast.show({
      title: 'Error',
      titleColor: 'FF0000',
      class: 'text-danger',
      color:'red',
      position: 'topRight',
      message:'La imagen no puede superar los 8MB'
  });
  $('#input-img').val('');
  this.file = undefined;

   }

   console.log(this.file);

}

eliminar(id:any)
{
  this._productoService.eliminar_imagen_galeria_admin(this.id,{_id:id},this.token).subscribe(
    response  =>{

      console.log(response);
      iziToast.show({
        title: 'Success',
        titleColor: '#1DC74C',
        class: 'text-success',
        color:'#FFF',
        position: 'topRight',
        message:'Se elimino correctamente la imágen.'
  });

  $('#delete-' +id).modal('hide');
  $('.modal-backdrop').removeClass('show');
  this.obtener_producto_admin();
    

  

    },
    error  => {
      console.log(error);
    }
  )

}

}
