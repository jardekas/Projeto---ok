import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CursoService {
  apiURL: string = 'https://crud-crud2.herokuapp.com/crud/curso';

  constructor(public httpClient: HttpClient) {}

  obterCursoPorId(id: string) {
    return this.httpClient.get(this.apiURL + '/' + id);
  }

  obterTodosCurso(page: number, search: string) {
    return this.httpClient.get(
      this.apiURL + `?size=5&page=${page}&search=${search}`
    );
  }

  salvarCurso(curso: any) {
    return this.httpClient.post(this.apiURL, curso);
  }

  atualizarCurso(curso: any) {
    return this.httpClient.put(this.apiURL + '/' + curso.id, curso);
  }

  removerCurso(id: string) {
    return this.httpClient.delete(this.apiURL + '/' + id);
  }
}
