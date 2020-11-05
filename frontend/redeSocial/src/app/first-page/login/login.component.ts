import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { UsuariosService } from './../../shared/services/usuarios/usuarios.service';
import { Router } from '@angular/router';
import { UserContextService } from './../../shared/services/usuarios/user-context.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  mensagem: string
  faSpinner = faSpinner
  iconViewer = false;

  constructor(private formBuilder: FormBuilder, 
              private userService: UsuariosService,
              private router: Router,
              private userContext: UserContextService) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.maxLength(40)],],
      senha: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(12)]]
    });
  }

  verificaCampo(campo){
    if(this.formulario.get(campo).touched){
      if(this.formulario.get(campo).invalid){
        return "is-invalid";
      }else{
        return "is-valid";
      }
    }
  }

  logar(){
    if(this.formulario.valid){
      this.iconViewer = true;
      this.userService.verificaUsuario(this.formulario.value).subscribe(data => {
        if(data == null){
          this.mensagem = "Email ou Senha incorretos"
          this.iconViewer = false;
        }else{
          //console.log(data);
          this.userContext.user = data;
          this.router.navigate(['home', data.id]);
        }
      },
      (error: any) => {
        this.mensagem = "Verifique sua conexão e tente novamente mais tarde";
        this.iconViewer = false;
      });
    }else{
      this.mensagem = "Preencha os campos corretamente"
    }
  }

}
