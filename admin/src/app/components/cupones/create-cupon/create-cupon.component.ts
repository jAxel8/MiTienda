import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CuponService } from 'src/app/services/cupon.service';


declare var jQuery:any;
declare var $: any;
declare var iziToast: any;
@Component({
  selector: 'app-create-cupon',
  templateUrl: './create-cupon.component.html',
  styleUrls: ['./create-cupon.component.css']
})
export class CreateCuponComponent implements OnInit {


  public cupon : any = {
    tipo:''

  };
  public load_btn = false;
  public token;


  constructor(
    private _cuponService : CuponService,
    private _route : Router
    

  ) {
    
    this.token = localStorage.getItem('token'); 
  
  }

  ngOnInit(): void {

    
  }


  registro(registroForm: any)
  {
    if(registroForm.valid){
      this.load_btn = true;
      this._cuponService.registro_cupon_admin(this.cupon,this.token).subscribe(
        response => {
          iziToast.show({
            title: 'Success',
            titleColor: '#1DC74C',
            class: 'text-success',
            color:'#FFF',
            position: 'topRight',
            message:'Cupòn registrado correctamente'
      });

      this.load_btn = false;
      this._route.navigate(['/panel/cupones'])

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

}
