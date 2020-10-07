import { UsuariosService } from './../../shared/services/usuarios/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  mensagem: string

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
    if(this.formulario.valid){
      this.userService.getUser(this.formulario.value).subscribe(data => {
        console.log(data)
        //location.assign('')
      },
      (error: any) => this.mensagem = "Verifique sua conexão e tente novamente mais tarde",
      );
    }else{
      this.mensagem = "Preencha os campos corretamente"
    }
  }

}
