import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';



declare var jQuery:any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public cliente : any = {};
  public id;
  public token;

  constructor(
    private _clienteService : ClienteService
  ) {

    this.id = localStorage.getItem('_id');
    this.token = localStorage.getItem('token');

    if(this.id)
    {
      this.obtener_datos_cliente();
    }

   }

  ngOnInit(): void {
  }




actualizar(actualizarForm: any)
{
  if(actualizarForm.valid)
  {
    this._clienteService.actualizar_perfil_cliente_guest(this.id,this.cliente,this.token).subscribe(
      response =>
      {

        this.cliente = response.data;
        iziToast.show({
          title: 'Success',
          titleColor: '#1DC74C',
          class: 'text-success',
          color:'#FFF',
          position: 'topRight',
          message:'Su perfil ha sido actualizado.'
    });

    window.location.reload();
      },
      error => {
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


obtener_datos_cliente()
{
  this._clienteService.obtener_cliente_guest(this.id,this.token).subscribe(
    response =>
    {
      console.log(response);
      this.cliente = response.data;
    },
    error => {
      console.log(error);
    }
  )
}




}
