import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DescuentoService } from 'src/app/services/descuento.service';
import { GLOBAL } from 'src/app/services/GLOBAL';



declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-create-descuento',
  templateUrl: './create-descuento.component.html',
  styleUrls: ['./create-descuento.component.css']
})
export class CreateDescuentoComponent implements OnInit {

  public descuento: any = {};
  public file: any
  public imgSelect: any | ArrayBuffer = 'assets/img/01.jpg';
  public config: any = {};
  public token;
  public load_btn = false;
  public url;

  constructor(

    private _descuentoService : DescuentoService,
    private _router: Router

  ) {

    this.token = localStorage.getItem('token');
    this .url = GLOBAL.url;
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
          message:'Debes subir un banner'
      });



      }else{
        if(this.descuento.descuento >= 1 && this.descuento.descuento <= 100 )
        {
          this.load_btn = true;
  
        this._descuentoService.registro_descuento_admin(this.descuento,this.file,this.token).subscribe(
          response  =>{
            
            iziToast.show({
              title: 'Success',
              titleColor: '#1DC74C',
              class: 'text-success',
              color:'#FFF',
              position: 'topRight',
              message:'Descuento registrado correctamente'
        });
            this.load_btn = false;
            this._router.navigate(['/panel/descuentos'])
  
          },
          error  => {
            console.log(error);
            this.load_btn = false;
          }
        )
        }else{iziToast.show({
          title: 'Error',
          titleColor: 'FF0000',
          class: 'text-danger',
          color:'red',
          position: 'topRight',
          message:'El descuento debe ser entre 1% y 100%'
      });

        }
        
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

  reloadCurrentPage()
  {
    window.location.reload()
  }

}