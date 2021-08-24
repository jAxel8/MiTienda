import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient,HttpClientModule } from "@angular/common/http";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routing } from './approuting';
import { FooterComponent } from './components/footer/footer.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { SidebarComponent } from './components/usuario/sidebar/sidebar.component';
import { ShowProductoComponent } from './components/productos/show-producto/show-producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { DireccionesComponent } from './components/usuario/direcciones/direcciones.component';
import { DescuentoPipe } from './pipes/descuento.pipe';
import { ContactoComponent } from './components/contacto/contacto.component';
import { RatingModule } from 'ng-starrating';

import { IndexOrdenesComponent } from './components/usuario/ordenes/index-ordenes/index-ordenes.component';
import { DetalleOrdenComponent } from './components/usuario/ordenes/detalle-orden/detalle-orden.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    InicioComponent,
    LoginComponent,
    NavComponent,
    IndexProductoComponent,
    PerfilComponent,
    SidebarComponent,
    ShowProductoComponent,
    CarritoComponent,
    DireccionesComponent,
    DescuentoPipe,
    ContactoComponent,

    IndexOrdenesComponent,
    DetalleOrdenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    routing,
    HttpClientModule,
    NgbPaginationModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
