import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FormularioService {
  apiURL: string = 'https://crud-crud2.herokuapp.com/crud/formulario';

  constructor(public httpClient: HttpClient) {}

  obterFormularioPorId(id: string) {
    return this.httpClient.get(this.apiURL + '/' + id);
  }

  obterTodasFormularios() {
    return this.httpClient.get(this.apiURL + `?size=999`);
  }

  salvarFormulario(formulario: any) {
    return this.httpClient.post(this.apiURL, formulario);
  }

  atualizarFormulario(formulario: any) {
    return this.httpClient.put(this.apiURL + '/' + formulario.id, formulario);
  }

  removerFormulario(id: string) {
    return this.httpClient.delete(this.apiURL + '/' + id);
  }
}
