import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';



declare var jQuery:any;
declare var $: any;
declare var iziToast: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any ={}
  public usuario: any = {};
  public token;

  constructor(
    private _clienteService : ClienteService,
    private _router : Router
  ) { 
    this.token = localStorage.getItem('token');
    if(this.token)
    {
      this._router.navigate(['/'])
    }else{
      
    }
  }

  ngOnInit(): void {


  }

  login(loginForm: any)
  {
    if(loginForm.valid)
    {

      let data = {
        email: this.user.email,
        password: this.user.password
      }

      this._clienteService.login_cliente(data).subscribe(
        response =>
        {
          if(response.data == undefined)
          {
            iziToast.show({
              title: 'Error',
              titleColor: 'FF0000',
              class: 'text-danger',
              color:'red',
              position: 'topRight',
              message: response.message
        });
          }else{
            this.usuario = response.data;
            localStorage.setItem('token',response.token);
            localStorage.setItem('_id',response.data._id);
            



            this._router.navigate(['/'])
            window.location.reload();
          }
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
        message:'los datos de formulario no son validos'
  });

    }
  }

}
