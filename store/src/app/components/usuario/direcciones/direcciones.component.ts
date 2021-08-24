import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { GuestService } from 'src/app/services/guest.service';

declare var jQuery:any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.css']
})
export class DireccionesComponent implements OnInit {

  public token;
  public direccion : any = {
    pais:'',
    estado:'',
    ciudad:'',
    distrito:'',
    principal:false
  };

  public load_data = true;

  public direcciones: Array<any> = [];
  public estados : Array<any> = [];
  public ciudades : Array<any> = [];
  
  public estados_arr : Array<any> = [];
  public ciudades_arr : Array<any> = [];

  constructor(
    private _guestService: GuestService,
    private _clienteService : ClienteService

  ) {
    this.token = localStorage.getItem('token');
  

    this._guestService.get_estados().subscribe(
      response =>  {
        this.estados_arr = response;

      }
    )

    this._guestService.get_municipios().subscribe(
      response =>  {
        this.ciudades_arr = response;

      }
    )

   }

  ngOnInit(): void {
    this.obtener_direccion_cliente();
  }


  obtener_direccion_cliente()
  {
    this._clienteService.obtener_direccion_cliente(localStorage.getItem('_id'),this.token).subscribe(
      response =>  {
        this.direcciones = response.data;
        this.load_data = false;
      }
    )
  }

  select_pais()
  {
    if(this.direccion.pais == 'Mexico')
    {
      $('#sl-estado').prop('disabled',false);
      this._guestService.get_estados().subscribe(
        response =>  {
          response.forEach(element => {
            this.estados.push(
              {
                id:element.id,
                name: element.name,
              })
            
          });

        }
      )
     }else{
      $('#sl-estado').prop('disabled',true);
     }
    }


    select_estado()
    {
      this.ciudades = [];
      $('#sl-ciudad').prop('disabled',false);
      this._guestService.get_municipios().subscribe(
        response =>  {
          response.forEach(element => {
            if(element.state_id == this.direccion.estado)
            {
              this.ciudades.push(element)
              
            };

            
          });
          

        }
      )
    }



    registrar(registroForm:any)
    {
      if(registroForm.valid)
      {
        this.estados_arr.forEach(element =>
          {
            if(parseInt(element.id) == parseInt(this.direccion.estado))
            {
              this.direccion.estado = element.name;
            }
          });

          this.ciudades_arr.forEach(element =>
            {
              if(parseInt(element.id) == parseInt(this.direccion.ciudad))
              {
                this.direccion.ciudad = element.name;
              }
            });




        let data = {
          cliente: localStorage.getItem('_id'),
          destinatario: this.direccion.destinatario,
          dni: this.direccion.dni,
          zip: this.direccion.zip,
          telefono: this.direccion.telefono,
          pais: this.direccion.pais,
          estado: this.direccion.estado,
          ciudad: this.direccion.ciudad,
          distrito: this.direccion.distrito,
          direccion: this.direccion.direccion,
          principal : this.direccion.principal
          
        }

        this._clienteService.registro_direccion_cliente(data,this.token).subscribe(
          response =>  {
            this.direccion = {
              pais:'',
              estado:'',
              ciudad:'',
              distrito:'',
              principal:false
            }

            $('#sl-estado').prop('disabled',true);
            $('#sl-ciudad').prop('disabled',true);

            this.obtener_direccion_cliente();

            iziToast.show({
              title: 'Success',
              titleColor: '#1DC74C',
              class: 'text-success',
              color:'#FFF',
              position: 'topRight',
              message:'Dirección agregada correctamente.'
        });
            
          } ,
          error =>{
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
          message:'los datos de formulario no son validos'
    });

      }
    }

    establecer_principal(id: any)
    {
      this._clienteService.cambiar_direccion_principal(id,localStorage.getItem('_id'),this.token).subscribe(
        response => 
        {
          console.log(response)
          this.obtener_direccion_cliente();
          iziToast.show({
            title: 'Success',
            titleColor: '#1DC74C',
            class: 'text-success',
            color:'#FFF',
            position: 'topRight',
            message:'Dirección actualizada..'
      });
        },
        error =>  {
          console.log(error)
        }
      )
    }





  }



