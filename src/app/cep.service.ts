import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CepService {
  constructor(public httpClient: HttpClient) {}

  obterEnderecoPeloCEP(cep: string) {
    return this.httpClient.get('https://ws.apicep.com/cep.json?code=' + cep);
  }
}
