import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { UsuariosService } from './../../shared/services/usuarios/usuarios.service';

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

  constructor(private formBuilder: FormBuilder, private userService: UsuariosService) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nick: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
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
  
  onSubmit(){
    console.log(this.formulario);
    if(this.formulario.valid){
      this.iconViewer = true;
      this.userService.postUser(this.formulario.value).subscribe(data => {
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
