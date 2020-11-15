import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { UsuariosService } from './../../shared/services/usuarios/usuarios.service';
import { Usuario } from './../../model/Usuario';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  formulario: FormGroup;
  mensagem: string
  faSpinner = faSpinner
  iconViewer = false;
  user: Usuario;

  constructor(private formBuilder: FormBuilder, 
              private userService: UsuariosService) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nick: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(40)], [this.validarEmail.bind(this)]],
      senha: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      urlperfil: ["../../../assets/perfil-sem-foto.jpg"],
      urlbackground: [null]
    });
  }
  verificaCampo(campo){
    if(this.formulario.get(campo).touched){
      return this.formulario.get(campo).invalid ? "is-invalid" : "is-valid";
    }
  }
  
  validarEmail(formControl: FormControl) {
    return this.userService.verificarEmail(formControl.value)
      .pipe(map(emailExiste => emailExiste ? { emailInvalido: true } : null),
      catchError(err => this.mensagem = "Verifique sua conexão e tente novamente mais tarde")
      );
  }

  onSubmit(){
    if(this.formulario.valid){
      this.iconViewer = true;
      this.userService.postUser(this.formulario.value).subscribe((data: Usuario) => {
        location.assign('')
      },
      (error: any) => 
        this.mensagem = "Verifique sua conexão e tente novamente mais tarde"
      );
    }else{
      this.mensagem = "Preencha os campos corretamente"
    }
  }
}
