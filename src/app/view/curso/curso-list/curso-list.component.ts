import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../../curso.service';

@Component({
  selector: 'app-curso-list',
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css'],
})
export class CursoListComponent implements OnInit {
  search: string = '';

  cursos: any[] = [];

  ready: boolean = false;

  page: number = 1;

  totalElements: number = 0;

  constructor(public cursoService: CursoService) {}

  ngOnInit() {
    this.carregarCurso();
  }

  remover(id: string) {
    this.cursoService
      .removerCurso(id)
      .toPromise()
      .then((result) => {
        this.carregarCurso();
      });
  }

  carregarCurso(page: number = 1) {
    this.page = page;
    this.cursoService
      .obterTodosCurso(page - 1, this.search)
      .subscribe((result: any) => {
        this.cursos = result.content;
        this.totalElements = result.totalElements;
        this.ready = true;
      });
  }
}
