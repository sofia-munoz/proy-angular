import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { HomeComponent } from './components/common/home/home.component';
import { LoginService } from './services/login/login.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PlanComponent } from './components/plan/plan.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { InstalacionesComponent } from './components/instalaciones/instalaciones.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RutinasComponent } from './components/rutinas/rutinas.component';
import { RegistroAlumnosComponent } from './components/registro-alumnos/registro-alumnos.component';
import { RegistroAlumnosFormComponent } from './components/registro-alumnos-form/registro-alumnos-form.component';
import { TokenInterceptorService } from './services/token-interceptor/token-interceptor.service';
import { AnunciosComponent } from './components/anuncios/anuncios.component';
import { InsumosComponent } from './components/insumos/insumos.component';
import { InsumosFormComponent } from './components/insumos-form/insumos-form.component';
import { PagoComponent } from './components/pago/pago.component';
import { GenerarRutinaComponent } from './components/generar-rutina/generar-rutina.component';
import { InsumosVentasComponent } from './components/insumos-ventas/insumos-ventas.component';
import { EstadisticasComponent } from './components/encargado/estadisticas/estadisticas.component';
import { EstadisticasPagoComponent } from './components/encargado/estadisticas-pago/estadisticas-pago.component';
import { EstadisticasIngresoComponent } from './components/encargado/estadisticas-ingreso/estadisticas-ingreso.component';
import { EstadisticasAsistenciaComponent } from './components/encargado/estadisticas-asistencia/estadisticas-asistencia.component';
import { EstadisticasCuotaComponent } from './components/encargado/estadisticas-cuota/estadisticas-cuota.component';
import { EstadisticasInsumoComponent } from './components/encargado/estadisticas-insumo/estadisticas-insumo.component';
import { FacturaComponent } from './components/factura/factura.component';
import { AlumnoHomeComponent } from './components/alumno/alumno-home/alumno-home.component';
import { AlumnoAsistenciasComponent } from './components/alumno/alumno-asistencias/alumno-asistencias.component';
import { AlumnoRutinasComponent } from './components/alumno/alumno-rutinas/alumno-rutinas.component';
import { AlumnoPagoCuotasComponent } from './components/alumno/alumno-pago-cuotas/alumno-pago-cuotas.component';
import { AlumnoFormModificarComponent } from './components/alumno/alumno-form-modificar/alumno-form-modificar.component';
import { ValidacionCaracteresDirective } from './directivas/validacion-caracteres.directive';
import { ValidacionNumerosDirective } from './directivas/validacion-numeros.directive';
import { ValidacionFechaNacimientoDirective } from './directivas/validacion-fecha-nacimiento.directive';
import { ValidacionUrlDirective } from './directivas/validacion-url.directive';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { ValidacionLetrasDirective } from './directivas/validacion-letras.directive';
import { AlumnoPublicacionesComponent } from './components/alumno/alumno-publicaciones/alumno-publicaciones.component';
import { AlumnoControlPesoComponent } from './components/alumno/alumno-control-peso/alumno-control-peso.component';
import { EntrenadorRutinasComponent } from './components/entrenador/entrenador-rutinas/entrenador-rutinas.component';
import { EntrenadorRutinasFormComponent } from './components/entrenador/entrenador-rutinas-form/entrenador-rutinas-form.component';
import { BalancePlanComponent } from './components/encargado/balance-plan/balance-plan.component';
import { BalancePlanFormComponent } from './components/encargado/balance-plan-form/balance-plan-form.component';
import { BalancePlanHistoricoComponent } from './components/encargado/balance-plan-historico/balance-plan-historico.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    PlanComponent,
    ContactoComponent,
    InstalacionesComponent,
    PerfilComponent,
    RutinasComponent,
    RegistroAlumnosComponent,
    RegistroAlumnosFormComponent,
    AnunciosComponent,
    InsumosComponent,
    InsumosFormComponent,
    PagoComponent,
    GenerarRutinaComponent,
    InsumosVentasComponent,
    EstadisticasComponent,
    EstadisticasPagoComponent,
    EstadisticasIngresoComponent,
    EstadisticasAsistenciaComponent,
    EstadisticasCuotaComponent,
    EstadisticasInsumoComponent,
    FacturaComponent,
    AlumnoHomeComponent,
    AlumnoAsistenciasComponent,
    AlumnoRutinasComponent,
    AlumnoPagoCuotasComponent,
    AlumnoFormModificarComponent,
    ValidacionCaracteresDirective,
    ValidacionNumerosDirective,
    ValidacionFechaNacimientoDirective,
    ValidacionUrlDirective,
    ValidacionLetrasDirective,
    AlumnoPublicacionesComponent,
    AlumnoControlPesoComponent,
    EntrenadorRutinasComponent,
    EntrenadorRutinasFormComponent,
    ValidacionLetrasDirective,
    AlumnoPublicacionesComponent,
    BalancePlanComponent,
    BalancePlanFormComponent,
    BalancePlanHistoricoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
     }],
  bootstrap: [AppComponent]
})
export class AppModule { }
