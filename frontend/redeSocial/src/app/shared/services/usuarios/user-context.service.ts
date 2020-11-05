import { Injectable } from "@angular/core";
import { Usuario } from '../../../model/Usuario';

@Injectable({ providedIn: 'root' })
export class UserContextService {

  private _user: Usuario = null;

  get user(): Usuario {
    return this._user;
  }

  set user(value: Usuario) {
    this._user = value;
  }
}
