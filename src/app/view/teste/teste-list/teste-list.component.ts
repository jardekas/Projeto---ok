import { Component, OnInit } from '@angular/core';
import { testeService } from '../../../teste.service';

@Component({
  selector: 'app-teste-list',
  templateUrl: './teste-list.component.html',
  styleUrls: ['./teste-list.component.css'],
})
export class TesteListComponent implements OnInit {
  testes: any[] = [];

  constructor(public testeService: testeService) {}

  ngOnInit() {
    this.carregarteste();
  }

  remover(id: string) {
    this.testeService.removerteste(id).subscribe(() => {
      this.carregarteste();
    });
  }

  carregarteste() {
    this.testeService.obterTodastestes().subscribe((result: any) => {
      this.testes = result.content;
    });
  }
}
