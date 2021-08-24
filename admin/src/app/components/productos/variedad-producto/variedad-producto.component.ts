import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';

declare var jQuery:any;
declare var $: any;
declare var iziToast:any;


@Component({
  selector: 'app-variedad-producto',
  templateUrl: './variedad-producto.component.html',
  styleUrls: ['./variedad-producto.component.css']
})
export class VariedadProductoComponent implements OnInit {

  public producto : any = {};

  public token;
  public id: any;

  public nueva_variedad = "";

  public load_btn = false;

  public url;

  constructor(
   private _route: ActivatedRoute,
   private _productoService: ProductoService
  ) { 
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {

    this.obtener_producto_admin()

  }


  agregar_variedad()
  {
    if(this.nueva_variedad)
    {
      

      this.producto.variedades.push({titulo: this.nueva_variedad});
      this.nueva_variedad = "";

    }else{iziToast.show({
      title: 'Error',
      titleColor: 'FF0000',
      class: 'text-danger',
      color:'red',
      position: 'topRight',
      message:'Llene correctamente el formulario'
  });
      
    }
  }

  eliminar_variedad(idx:any)
  { 
    this.producto.variedades.splice(idx,1);

  }


  actualizar()
  {
    if(this.producto.titulo_variedad)
    {
      this.load_btn = true;
      if(this.producto.variedades.length >= 1 ){
        this._productoService.actualizar_producto_variedades_admin({
          titulo_variedad: this.producto.titulo_variedad,
          variedades: this.producto.variedades

        },this.id,this.token).subscribe(
          response  => {
            
            iziToast.show({
              title: 'Success',
              titleColor: '#1DC74C',
              class: 'text-success',
              color:'#FFF',
              position: 'topRight',
              message:'Variedades actualizada correctamente'
        });
        this.load_btn = false;

          },
          error  => {
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
        message:'Se debe agregar al menos una variedad'
    });

      }


    }else{iziToast.show({
      title: 'Error',
      titleColor: 'FF0000',
      class: 'text-danger',
      color:'red',
      position: 'topRight',
      message:'Debe agregar un titulo'
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

}
