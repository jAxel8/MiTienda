import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';

declare var jQuery:any;
declare var $: any;
declare var iziToast:any;


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  public producto: any = {
    categoria:''
  };
  public file: any
  public imgSelect: any | ArrayBuffer = 'assets/img/01.jpg';
  public config: any = {};
  public token;
  public load_btn = false;

  public config_global: any = {};

  constructor(
    private _productoService : ProductoService,
    private _adminService : AdminService,
    private _router: Router

  ) {

    this.config = {
      height : 500 
    }

    this.token = this._adminService.getToken();

    this.obtener_config_public();

   }

  ngOnInit(): void {
  }


  registro(registroForm : any)
  {
    if(registroForm.valid)
    {
      if(this.file == undefined){
        iziToast.show({
          title: 'Error',
          titleColor: 'FF0000',
          class: 'text-danger',
          color:'red',
          position: 'topRight',
          message:'Debes subir una imagen'
      });



      }else{
        console.log(this.producto);
        console.log(this.file);
        this.load_btn = true;
  
        this._productoService.registro_producto_admin(this.producto,this.file,this.token).subscribe(
          response  =>{
            
            iziToast.show({
              title: 'Success',
              titleColor: '#1DC74C',
              class: 'text-success',
              color:'#FFF',
              position: 'topRight',
              message:'Producto registrado correctamente'
        });
            this.load_btn = false;
            this._router.navigate(['/panel/productos'])
  
          },
          error  => {
            console.log(error);
            this.load_btn = false;
          }
        )
      }

    }else{
      iziToast.show({
        title: 'Error',
        titleColor: 'FF0000',
        class: 'text-danger',
        color:'red',
        position: 'topRight',
        message:'Los datos de formulario no son validos'
    });
    this.load_btn = false;
    $('#input-portada').text('Seleccionar imagen');
    this.imgSelect = 'assets/img/01.jpg';
    this.file = undefined;
  
  }



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
      const reader = new FileReader();
      reader.onload = e  => this.imgSelect = reader.result;
      console.log(this.imgSelect);
      reader.readAsDataURL(file); 

      $('#input-portada').text(file.name);

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
    $('#input-portada').text('Seleccionar imagen');
    this.imgSelect = 'assets/img/01.jpg';
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
  $('#input-portada').text('Seleccionar imagen');
  this.imgSelect = 'assets/img/01.jpg';
  this.file = undefined;

   }

   console.log(this.file);

}


obtener_config_public()
{
  this._adminService.obtener_config_publico().subscribe(
    response => {
      this.config_global = response.data;
    },
    error => {
      console.log(error);
    }
  )

}



}
