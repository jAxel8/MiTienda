import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from "../../services/admin.service";

declare var jQuery:any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any={};
  public usuario :any={};
  public token :any = {};

  constructor(
    private _adminService : AdminService,
    private _router : Router

  ) {

    this.token = this._adminService.getToken();
    
    
    
  }

  ngOnInit(): void {
    console.log(this.token);
    if(this.token)
    {
      this._router.navigate(['/']);
    }else{
      // Mantener componente
    }
  }

  login(loginForm: any) {
    if (loginForm.valid) {
      console.log(this.user);

      let data = {
        email: this.user.email,
        password: this.user.password
      }

      this._adminService.login_admin(data).subscribe(
        response => {
          if (response.data == undefined) {
            iziToast.show({
              title: 'Success',
              titleColor: 'FF0000',
              class: 'text-danger',
              color:'green',
              position: 'topRight',
              message:response.message
        });
          } else {
            this.usuario = response.data;

            localStorage.setItem('token', response.token);
            localStorage.setItem('_id',response.data._id);
            
            this._router.navigate(['/']);

        } },
        error => { console.log(error)}
      );
    } else {
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
