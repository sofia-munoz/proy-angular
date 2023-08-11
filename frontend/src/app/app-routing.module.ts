import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/common/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PlanComponent } from './components/plan/plan.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { InstalacionesComponent } from './components/instalaciones/instalaciones.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RegistroAlumnosComponent } from './components/registro-alumnos/registro-alumnos.component';
import { RegistroAlumnosFormComponent } from './components/registro-alumnos-form/registro-alumnos-form.component';
import { AnunciosComponent } from './components/anuncios/anuncios.component';
import { InsumosComponent } from './components/insumos/insumos.component';
import { InsumosFormComponent } from './components/insumos-form/insumos-form.component';
import { PagoComponent } from './components/pago/pago.component';
import { InsumosVentasComponent } from './components/insumos-ventas/insumos-ventas.component';
import { EstadisticasComponent } from './components/encargado/estadisticas/estadisticas.component';
import { EstadisticasPagoComponent } from './components/encargado/estadisticas-pago/estadisticas-pago.component';
import { EstadisticasIngresoComponent } from './components/encargado/estadisticas-ingreso/estadisticas-ingreso.component';
import { EstadisticasAsistenciaComponent } from './components/encargado/estadisticas-asistencia/estadisticas-asistencia.component';
import { EstadisticasCuotaComponent } from './components/encargado/estadisticas-cuota/estadisticas-cuota.component';
import { EstadisticasInsumoComponent } from './components/encargado/estadisticas-insumo/estadisticas-insumo.component';
import { FacturaComponent } from './components/factura/factura.component';
import {AlumnoHomeComponent} from "./components/alumno/alumno-home/alumno-home.component";
import {AlumnoAsistenciasComponent} from "./components/alumno/alumno-asistencias/alumno-asistencias.component";
import {AlumnoRutinasComponent} from "./components/alumno/alumno-rutinas/alumno-rutinas.component";
import {AlumnoPagoCuotasComponent} from "./components/alumno/alumno-pago-cuotas/alumno-pago-cuotas.component";
import {AlumnoFormModificarComponent} from "./components/alumno/alumno-form-modificar/alumno-form-modificar.component";
import { AlumnoPublicacionesComponent } from './components/alumno/alumno-publicaciones/alumno-publicaciones.component';

import { AlumnoControlPesoComponent } from './components/alumno/alumno-control-peso/alumno-control-peso.component';
import {EntrenadorRutinasComponent} from "./components/entrenador/entrenador-rutinas/entrenador-rutinas.component";
import {EntrenadorRutinasFormComponent} from "./components/entrenador/entrenador-rutinas-form/entrenador-rutinas-form.component";
import { BalancePlanComponent } from './components/encargado/balance-plan/balance-plan.component';
import { BalancePlanFormComponent } from './components/encargado/balance-plan-form/balance-plan-form.component';
import { BalancePlanHistoricoComponent } from './components/encargado/balance-plan-historico/balance-plan-historico.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'instalaciones', component: InstalacionesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'plan', component: PlanComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'registroAlumnos', component: RegistroAlumnosComponent},
  {path: 'registroAlumnos-Form/:id', component: RegistroAlumnosFormComponent},
  {path: 'anuncios', component: AnunciosComponent},
  {path: 'insumos', component: InsumosComponent},
  {path: 'insumos-form/:id', component: InsumosFormComponent},
  {path: 'insumos-ventas', component: InsumosVentasComponent},
  {path: 'pago', component: PagoComponent},
  {path: 'factura', component: FacturaComponent},
  {path: 'estadisticas', component: EstadisticasComponent},
  {path: 'estadisticas-pago', component: EstadisticasPagoComponent},
  {path: 'estadisticas-ingreso', component: EstadisticasIngresoComponent},
  {path: 'estadisticas-asistencia', component: EstadisticasAsistenciaComponent},
  {path: 'estadisticas-cuota', component: EstadisticasCuotaComponent},
  {path: 'estadisticas-insumo', component: EstadisticasInsumoComponent},
  {path: 'alumno-perfil', component: AlumnoHomeComponent},
  {path: 'alumno-perfil-editar', component: AlumnoFormModificarComponent},
  {path: 'alumno-asistencias', component: AlumnoAsistenciasComponent},
  {path: 'alumno-rutinas', component: AlumnoRutinasComponent},
  {path: 'alumno-pagos', component: AlumnoPagoCuotasComponent},
  {path: 'alumno-publicaciones', component:AlumnoPublicacionesComponent},
  {path: 'alumno-control-peso',component:AlumnoControlPesoComponent},
  {path: 'entrenador-generar-rutina', component: EntrenadorRutinasComponent},
  {path: 'entrenador-rutina-form', component: EntrenadorRutinasFormComponent},
  {path: 'balancePlanes', component: BalancePlanComponent},
  {path: 'balancePlanes-form/:id', component: BalancePlanFormComponent},
  {path: 'balancePlanes-historico', component: BalancePlanHistoricoComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
