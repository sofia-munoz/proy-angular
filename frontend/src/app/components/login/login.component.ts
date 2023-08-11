import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario/usuario';
import { LoginService } from 'src/app/services/login/login.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  userform: Usuario = new Usuario(); //usuario mapeado al formulario
  returnUrl!: string;
  msglogin!: string; // mensaje que indica si no paso el loguin
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private toastrService: ToastrService) {
  }
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }
  login() {
    this.loginService.login(this.userform.username, this.userform.password)
      .subscribe(
        (result) => {
          var user = result;
            //guardamos el token localmente
            sessionStorage.setItem("token", user.token);
            //guardamos el user
            sessionStorage.setItem("user", user.username);
            sessionStorage.setItem("userid", user.userid);
            sessionStorage.setItem("rol", user.rol);
            //redirigimos a home o a pagina que llamo
            this.router.navigateByUrl(this.returnUrl);
            this.toastrService.info(result.message, "Login", {positionClass: 'toast-top-right', timeOut: 1000});
        },
        error => {
          this.toastrService.error(error.error.error, "Error en el login", {positionClass: 'toast-top-right'});
        });
  }
}
