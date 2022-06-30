import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class testeService {
  apiURL: string = 'https://crud-crud2.herokuapp.com/crud/teste';

  constructor(public httpClient: HttpClient) {}

  obtertestePorId(id: string) {
    return this.httpClient.get(this.apiURL + '/' + id);
  }

  obterTodastestes() {
    return this.httpClient.get(this.apiURL + `?size=999`);
  }

  salvarteste(teste: any) {
    return this.httpClient.post(this.apiURL, teste);
  }

  atualizarteste(teste: any) {
    return this.httpClient.put(this.apiURL + '/' + teste.id, teste);
  }

  removerteste(id: string) {
    return this.httpClient.delete(this.apiURL + '/' + id);
  }
}