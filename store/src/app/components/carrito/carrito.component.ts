import { Component, ElementRef, OnInit, ViewChild,NgZone } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { io } from "socket.io-client";
import { GuestService } from 'src/app/services/guest.service';
import { Router } from '@angular/router';






declare var Cleave:any;
declare var noUiSlider : any;
declare var $:any;
declare var iziToast:any;
declare var StickySidebar;


declare var paypal;


interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
} 

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  @ViewChild('paypalButton', { static: true })
  paypalElement!: ElementRef;

  public idcliente;
  public token;
  public descuento = 0;

  public credit_card;
  public exp_date;
  public cvc;

  public descuento_activo : any =undefined;

  public carrito_arr: Array<any>  = [];

  public url;
  public subtotal = 0;
  public total_pagar = 0;

  public socket = io('http://localhost:4201');

  public direccion_principal : any = {};

  public envios: Array<any>  = [];

  public precio_envio = "0";

  public venta : any  = {};
  public dventa : Array<any> = [];
  public error_cupon = "";




  constructor(
    private _clienteService : ClienteService,
    private _guestService : GuestService,
    private _router : Router,

  

  ) {
      this.idcliente = localStorage.getItem('_id');
      this.venta.cliente = this.idcliente;
      this.token = localStorage.getItem('token');
      this.url = GLOBAL.url;




    this._guestService.get_envios().subscribe(
      response => {
        this.envios = response;
      }
    )
    
  }

  ngOnInit(): void {

    this.init_Data();

    setTimeout(() => {
        new Cleave('#cc-number', {
          creditCard: true,
          onCreditCardTypeChanged: function (type) {
              // update UI ...
          }
      });

      new Cleave('#cc-exp-date', {
        date: true,
        datePattern: ['m', 'y']
    });

    var sidebar = new StickySidebar('.sidebar-sticky', {topSpacing: 20});
    });


    this.obtener_direccion_principal_cliente();

   

paypal.Buttons({
    style: {
        layout: 'horizontal'
    },
    createOrder: (data,actions)=>{

        return actions.order.create({
          purchase_units : [{
            description : 'Nombre del pago',
            amount : {
              currency_code : 'USD',
              value: this.total_pagar
            },
          }]
        });
      
    },
    onApprove : async (data,actions)=>{
      const order = await actions.order.capture();
      this.venta.transaccion = order.purchase_units[0].payments.captures[0].id;
      
      this.venta.detalles = this.dventa;

      this._clienteService.registro_compra_cliente(this.venta,this.token).subscribe(
        response => {
          

          this._clienteService.enviar_correo_compra_cliente(response.venta._id,this.token).subscribe(
            response => {
              this._router.navigate(['/']);
            }
          )

        }
        

      );

      
      
      
    },
    onError : err =>{
     
    },
    onCancel: function (data, actions) {
      
    }
  }).render(this.paypalElement.nativeElement);



  this._guestService.obtener_descuento_activo().subscribe(
    response =>
    {
        if(response.data != undefined)
        {
          this.descuento_activo = response.data[0];
        }else{
          this.descuento_activo = undefined;
        }

    }
  )

  }

  init_Data()
  {
    this._clienteService.obtener_carrito_cliente(this.idcliente,this.token).subscribe(
      response => {
        this.carrito_arr = response.data;

        this.carrito_arr.forEach(element => {
          this.dventa.push({
            producto: element.producto._id,
            subtotal: element.producto.precio,
            variedad: element.variedad,
            cantidad: element.cantidad,
            cliente: localStorage.getItem('_id')

          });
          
        });



        this.calcular_carrito();
        this.calcular_total('Envio gratis');
      },
      error =>  {
        console.log(error);
      }
    )
  }

  obtener_direccion_principal_cliente()
  {
    this._clienteService.obtener_direccion_principal_cliente(this.idcliente,this.token).subscribe(
      response =>  {
        if(response.data == undefined)
        {
          this.direccion_principal = undefined;
        }else{
          this.direccion_principal = response.data;

          this.venta.direccion = this.direccion_principal._id;
        }
      }
    )
  }

  calcular_carrito()
  {
    this.subtotal = 0;
    if(this.descuento_activo == undefined)
    {
     this.carrito_arr.forEach(element =>
       {
         this.subtotal = Math.round(this.subtotal + parseInt(element.producto.precio));
       });
 
    }else if(this.descuento_activo != undefined){
     this.carrito_arr.forEach(element =>
       {
         let new_precio = Math.round(parseFloat(element.producto.precio) - (parseInt(element.producto.precio)*this.descuento_activo.descuento)/100);
         this.subtotal = this.subtotal + new_precio
       });
    }
  }

  eliminar_item(id:any)
  {
    this._clienteService.eliminar_carrito_cliente(id,this.token).subscribe(
      response  => {         
         iziToast.show({
        title: 'Success',
        titleColor: '#1DC74C',
        class: 'text-success',
        color:'#FFF',
        position: 'topRight',
        message:'Se elimino el producto correctamente'
  });

        this.socket.emit('delete-carrito',{data:response.data})
        this.init_Data();

      },
      error  => {
        console.log(error);
      }
    )
  }

  calcular_total(envio_titulo)
  {
    this.total_pagar = this.subtotal + parseInt(this.precio_envio);

    this.venta.subtotal = this.total_pagar;

    this.venta.envio_precio = parseInt(this.precio_envio);

    this.venta.envio_titulo = envio_titulo;

    console.log(this.venta);

  }

  validar_cupon()
  {
     if(this.venta.cupon){
      if(this.venta.cupon.toString().length <= 25)
      {
        // ES VALIDO
        

        this._clienteService.validar_cupon_cliente(this.venta.cupon,this.token).subscribe(
          response =>  {
            if(response.data != undefined)
            {

              if(response.data.tipo == 'ValorFijo')
              {
                this.descuento = response.data.valor;
                this.total_pagar = this.total_pagar - this.descuento;
              }
              else if(response.data.tipo == 'Porcentaje')
              {
                this.descuento = (this.total_pagar * response.data.valor)/100;
                this.total_pagar = this.total_pagar - this.descuento;
              }


            }else {
              this.error_cupon ="El cupòn no es vàlido"
            }
          }
        )


      }else {
        // NO VALIDO
        this.error_cupon ="El cupòn debe ser menos de 25 caràcteres"

      }
     }else{
      this.error_cupon ="El cupòn no es vàlido"
     }
  }

Pagar()
  { 
      if(this.credit_card && this.exp_date && this.cvc)
      {
      this.venta.transaccion = Math.random();
      
      this.venta.detalles = this.dventa;
        
      this._clienteService.registro_compra_cliente(this.venta,this.token).subscribe(
        response => {
          

          this._clienteService.enviar_correo_compra_cliente(response.venta._id,this.token).subscribe(
            response => {
              this._router.navigate(['/']);
            }
          )

        }
        

      );
      }else{
        console.log("error");
      }
  } 

}
