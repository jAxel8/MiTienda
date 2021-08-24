import { Component, OnInit } from '@angular/core';
import { GuestService } from 'src/app/services/guest.service';

declare var $:any;
declare var iziToast:any;
declare var StickySidebar;

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  public contacto : any = {}
  public load_btn = false;

  constructor(
    private _guestService : GuestService,
  ) { }

  ngOnInit(): void {
  }


  registro(registroForm:any)
  {
    if(registroForm.valid)
    {
      this.load_btn = true;
      this._guestService.enviar_mensaje_contacto(this.contacto).subscribe(
        response =>  {
          iziToast.show({
            title: 'Success',
            titleColor: '#1DC74C',
            class: 'text-success',
            color:'#FFF',
            position: 'topRight',
            message:'Su mensaje ha sido enviado.'
      });

      this.contacto = {};
      this.load_btn = false;
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
