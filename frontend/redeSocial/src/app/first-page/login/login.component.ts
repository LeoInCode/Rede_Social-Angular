import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { UsuariosService } from './../../shared/services/usuarios/usuarios.service';

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

  constructor(private formBuilder: FormBuilder, private userService: UsuariosService) { }

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
    console.log(this.formulario);
    this.iconViewer = true;
    if(this.formulario.valid){
      this.userService.getUser(this.formulario.value).subscribe(data => {
        if(data == null){
          console.log("null");
          this.mensagem = "Email ou Senha incorretos"
          this.iconViewer = false;
        }else{
          console.log(data);
          //this.router.navigate(['/']);
        }
      },
      (error: any) => {
        this.mensagem = "Verifique sua conexão e tente novamente mais tarde";
        this.iconViewer = false;
      });
    }else{
      this.mensagem = "Preencha os campos corretamente"
      this.iconViewer = false;
    }
  }

}
