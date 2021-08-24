import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast: any;

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {

  public cliente : any = {};
  public id : any;
  public token;
  public load_btn = false;
  public load_data = true;
  constructor(
    private _route: ActivatedRoute,
    private _clienteService: ClienteService,
    private _adminService : AdminService,
    private _router : Router
  ) {
    this.token = this._adminService.getToken();
   }

  ngOnInit(): void {

    this._route.params.subscribe(
      params  => {
        this.id = params['id'];

        this._clienteService.obtener_cliente_admin(this.id,this.token).subscribe(
          response  => {
            console.log(response);

            if(response.data  == undefined){

              this.cliente = undefined;
              this.load_data = false;

            }else{
              this.cliente = response.data;
              


                this.load_data = false;
           
            }



          },
          error  => {
            console.log(error);
          }
        );
        


        console.log(this.id);
      }
    )
  }

  actualizar(updateForm: any)
  {
    if(updateForm.valid){
      this.load_btn = true;
      this._clienteService.actualizar_cliente_admin(this.id,this.cliente,this.token).subscribe(
        response  =>{

          iziToast.show({
            title: 'Success',
            titleColor: '#1DC74C',
            class: 'text-success',
            color:'#FFF',
            position: 'topRight',
            message:'Datos actualizados correctamente'
      });
      this.load_btn = false;
      this._router.navigate(['/panel/clientes']);

        },
        error  => {
          console.log(error);
        }
      )
    }else {

      iziToast.show({
        title: 'Error',
        titleColor: 'FF0000',
        class: 'text-danger',
        color:'red',
        position: 'topRight',
        message:'Los datos de formulario no son validos'
  });
    }
      
    }
  }


