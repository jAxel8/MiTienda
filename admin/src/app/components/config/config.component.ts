import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { v4 as uuidv4 } from 'uuid';

declare var jQuery:any;
declare var $: any;
declare var iziToast: any;
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {


  public token;
  public config : any = {};
  public url;

  public titulo_cat = "";
  public icono_cat ="";

  public file: any 
  public imgSelect: any ;


  constructor(

    private _adminService: AdminService

  ) { 

    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;


    this._adminService.obtener_config_admin(this.token).subscribe(
      response  => {
        this.config = response.data;
        this.imgSelect = this.url+'obtener_logo/' + this.config.logo;
        console.log(this.config);
      },
      error  => {
        console.log(error);
      }
    )
  }

  ngOnInit(): void {

  }

  agregar_cat()
  {
      if(this.titulo_cat && this.icono_cat)
      {
        
        

        this.config.categorias.push({
          titulo : this.titulo_cat,
          icono : this.icono_cat,
          _id: uuidv4()

        });

          this.titulo_cat = '';
          this.icono_cat = '';

      }else
      {
        iziToast.show({
          title: 'Error',
          titleColor: 'FF0000',
          class: 'text-danger',
          color:'red',
          position: 'topRight',
          message:'Debe agregar un icono y titulo para agregar una categoria'
    });
      }
  }

  actualizar(confForm: any)
  { 
    if(confForm.valid)
    {
      let data = {
        titulo: confForm.value.titulo,
        serie: confForm.value.serie,
        correlativo: confForm.value.correlativo,
        categorias: this.config.categorias,
        logo: this.file
      }

      console.log(data);

      this._adminService.actualizar_config_admin("611c68ec45651043940cb79c",data,this.token).subscribe(
        response  => {
          iziToast.show({
            title: 'Success',
            titleColor: '#1DC74C',
            class: 'text-success',
            color:'#FFF',
            position: 'topRight',
            message:'Se actualizo correctamente la configuración'
      });
        },
        error  => {
          console.log(error);
        }
      )

    }else{
      iziToast.show({
        title: 'Error',
        titleColor: 'FF0000',
        class: 'text-danger',
        color:'red',
        position: 'topRight',
        message:'Completa correctamente el formulario'
  });
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
        $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbnail rounded');
        $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload');
        reader.readAsDataURL(file); 
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

  ngDoCheck():void
  {
      $('.cs-file-drop-preview').html("<img src="+this.imgSelect+">");
  }


  eliminar_categoria(idx:any)
  {
    this.config.categorias.splice(idx,1);
  }

}
