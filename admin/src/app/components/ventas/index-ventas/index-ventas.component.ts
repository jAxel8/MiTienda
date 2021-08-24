import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-index-ventas',
  templateUrl: './index-ventas.component.html',
  styleUrls: ['./index-ventas.component.css']
})
export class IndexVentasComponent implements OnInit {

  public desde : any;
  public hasta :any;
  public token;
  public page = 1;
  public pageSize = 5;

  public ventas : Array<any> = [];

  constructor(
    private _adminService: AdminService,
  ) { 

    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {

    this._adminService.obtener_ventas_admin(this.desde,this.hasta,this.token).subscribe(
      response => {
        this.ventas = response.data;
        ;
        
      }
    )
  }


  filtrar()
  {
    this._adminService.obtener_ventas_admin(this.desde,this.hasta,this.token).subscribe(
      response => {
        this.ventas = response.data;
        ;
        
      }
    )
  }

}
