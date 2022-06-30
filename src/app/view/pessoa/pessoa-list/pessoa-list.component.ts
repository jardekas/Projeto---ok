import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../../../pessoa.service';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.css'],
})
export class PessoaListComponent implements OnInit {
  search: string = '';

  pessoas: any[] = [];

  ready: boolean = false;

  page: number = 1;

  totalElements: number = 0;

  constructor(public pessoaService: PessoaService) {}

  ngOnInit() {
    this.carregarPessoas();
  }

  remover(id: string) {
    this.pessoaService
      .removerPessoa(id)
      .toPromise()
      .then((result) => {
        this.carregarPessoas();
      });
  }

  carregarPessoas(page: number = 1) {
    this.page = page;
    this.pessoaService
      .obterTodasPessoas(page - 1, this.search)
      .subscribe((result: any) => {
        this.pessoas = result.content;
        this.totalElements = result.totalElements;
        this.ready = true;
      });
  }
}
