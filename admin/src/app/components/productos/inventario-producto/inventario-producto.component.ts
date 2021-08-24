import { Component, OnInit } from '@angular/core';
import { GLOBAL } from "../../../services/GLOBAL";

import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';
import { ActivatedRoute } from '@angular/router';

import * as fs from "file-saver";
import { Workbook } from 'exceljs';

declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css']
})
export class InventarioProductoComponent implements OnInit {
  public page = 1;
  public pageSize = 20;
  public load_data = false;
  public filtro = "";
  public token;
  public producto: any = {};
  public productos: Array<any> = [];
  public arr_inventario: Array<any> = [];
  public url;
  public id:any;
  public _iduser: any;
  public inventarios: Array<any> = [];
  public inventario: any = {};



  constructor(
    private _productoService : ProductoService,
    private _adminService : AdminService,
    private _route: ActivatedRoute

  ) {
    this.token = localStorage.getItem('token');
    this._iduser = localStorage.getItem('_id');
    this .url = GLOBAL.url;
   }

  ngOnInit(): void {

    this._route.params.subscribe(
      params  => {
        this.id = params['id'];
        console.log(this.id);
        this._productoService.obtener_producto_admin(this.id,this.token).subscribe(
          response  => {
            if(response.data == undefined)
            {

              this.producto = undefined;

            }else{
              this.producto = response.data;
              this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
                response => {
                  
                  this.inventarios = response.data;
                  this.inventarios.forEach( element =>
                  {
                    this.arr_inventario.push({
                      admin: element.admin.nombres + '  ' + element.admin.apellidos,
                      cantidad: element.cantidad,
                      proveedor: element.proveedor
                    })
                  }                    )
                },
                error => {
                  console.log(error)
                }
              )
            }
          },
          error  => {
            console.log(error)
          }
        )
      }

    )
  }

  eliminar(id:any)
  {

    this._productoService.eliminar_inventario_producto_admin(id,this.token).subscribe(
      response  =>{
        
        console.log(response);
        iziToast.show({
          title: 'Success',
          titleColor: '#1DC74C',
          class: 'text-success',
          color:'#FFF',
          position: 'topRight',
          message:'Producto eliminado correctamente'
    });

    $('#delete-' + id).modal('hide');
    $('.modal-backdrop').removeClass('show');

    this.reloadCurrentPage();

    this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
      response => {
        console.log(response)
        this.inventarios = response.data;
      },
      error => {
        console.log(error)
      }
    )
      

    

      },
      error  => {
        console.log(error);
      }
    )


  }

  reloadCurrentPage()
  {
    window.location.reload()
  }

  registro_inventario(inventarioForm : any)
  { 
    if(inventarioForm.valid) 
    {
      let data = {
        producto: this.producto._id,
        cantidad: inventarioForm.value.cantidad,
        admin: this._iduser,
        proveedor: inventarioForm.value.proveedor,

      }
      console.log(data);

      this._productoService.registro_inventario_producto_admin(data,this.token).subscribe(
        response  => {
          iziToast.show({
            title: 'Success',
            titleColor: '#1DC74C',
            class: 'text-success',
            color:'#FFF',
            position: 'topRight',
            message:'Se agrego el nuevo stock al producto.'
      });
      this.reloadCurrentPage();
      this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
        response => {
          
          this.inventarios = response.data;
          
        },
        error => {
          console.log(error)
        }
      )
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
        message:'Los datos de formulario no son validos'
    });
    
    }

  }


  download_excel(){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Reporte de productos");

    worksheet.addRow(undefined);
    for (let x1 of this.arr_inventario){
      let x2=Object.keys(x1);

      let temp=[]
      for(let y of x2){
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }

    let fname='REP01- ';

    worksheet.columns = [
      { header: 'Trabajador', key: 'col1', width: 30},
      { header: 'Cantidad', key: 'col2', width: 15},
      { header: 'Proveedor', key: 'col3', width: 25},

    ]as any;

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });
  }


 
 

}
