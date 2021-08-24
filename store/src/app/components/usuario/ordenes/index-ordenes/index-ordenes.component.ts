import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

@Component({
  selector: 'app-index-ordenes',
  templateUrl: './index-ordenes.component.html',
  styleUrls: ['./index-ordenes.component.css']
})
export class IndexOrdenesComponent implements OnInit {

  public token;
  public url;
  public ordenes : Array<any> = [];
  public load_data = true;
  public id;
  public page = 1;
  public pageSize = 5;

  constructor(

    private _clienteService: ClienteService

  ) {
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
    this.id = localStorage.getItem('_id');
   }

  ngOnInit(): void {

    this.obtener_ordenes_cliente();

    
  }


  obtener_ordenes_cliente()
  {
    this._clienteService.obtener_ordenes_cliente(this.id,this.token).subscribe(
      response => {
        

        this.ordenes = response.data;

      
      },
      error =>  {
        console.log(error);
      }
    )
    this.load_data = false;
  }







}
