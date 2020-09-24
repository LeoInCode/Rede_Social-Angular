import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nick: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      senha: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      email: [null, [Validators.required, Validators.email],]
    });
    
  }
  
  onSubmit(){
    console.log(this.formulario);
  }

}
