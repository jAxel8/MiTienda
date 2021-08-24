import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
declare var jQuery:any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {

  public cliente: any = {
    genero:""
  };

  public token;
  public load_btn = false;

  constructor(
    private _clienteService: ClienteService,
    private _adminService: AdminService,
    private _router : Router
  ) {

    this.token = this._adminService.getToken();
   }

  ngOnInit(): void {
  }

  registro(registroForm:any)
  {
    if(registroForm.valid)
    {
      this.load_btn = true;
      this._clienteService.registro_cliente_admin(this.cliente,this.token).subscribe(
        response  =>{
          
          iziToast.show({
            title: 'Success',
            titleColor: '#1DC74C',
            class: 'text-success',
            color:'#FFF',
            position: 'topRight',
            message:'Cliente registrado correctamente'
      });

      this.cliente = {
        genero:'',
        nombres:'',
        apellidos: '',
        f_nacimiento:'',
        telefono: '',
        dni: '',
        email: ''
      }

      this._router.navigate(['/panel/clientes']);

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
        message:'los datos de formulario no son validos'
  });
    }

  }
}
