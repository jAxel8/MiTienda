import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CuponService } from 'src/app/services/cupon.service';

declare var jQuery:any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-update-cupon',
  templateUrl: './update-cupon.component.html',
  styleUrls: ['./update-cupon.component.css']
})
export class UpdateCuponComponent implements OnInit {

  public cupon : any = {
    tipo:''

  };
  public load_btn = false;
  public id : any;
  public token;
  public load_data = true;


  constructor(
    private _cuponService : CuponService,
    private _router : Router,
    private _route: ActivatedRoute
  ) {

    this.token = localStorage.getItem('token');
   }

  ngOnInit(): void {


    this._route.params.subscribe(
      params  => {
        this.id = params['id'];

        console.log(this.id);

        this._cuponService.obtener_cupon_admin(this.id,this.token).subscribe(
          response  => {
            if(response.data == undefined)
            {
              this.cupon = undefined;
              this.load_data = false;
            }
            else {
              this.cupon = response.data;
              this.load_data = false;
            }
            console.log(response);
          },
          error  => {
            console.log(error);
          }
        )
      }
    )


  }

  actualizar(updateForm: any)
  {
    if(updateForm.valid)
    {

      this.load_btn = true;
      this._cuponService.actualizar_cupon_admin(this.id,this.cupon,this.token).subscribe(
        response  => {
          iziToast.show({
            title: 'Success',
            titleColor: '#1DC74C',
            class: 'text-success',
            color:'#FFF',
            position: 'topRight',
            message:'Cupòn actualizado correctamente'
      });
      this._router.navigate(['/panel/cupones'])

          this.load_btn = false;
        },
        error  => 
        {
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
