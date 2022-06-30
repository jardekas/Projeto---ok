import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../../../formulario.service';

@Component({
  selector: 'app-formulario-list',
  templateUrl: './formulario-list.component.html',
  styleUrls: ['./formulario-list.component.css'],
})
export class FormularioListComponent implements OnInit {
  formularios: any[] = [];

  constructor(public formularioService: FormularioService) {}

  ngOnInit() {
    this.carregarFormulario();
  }

  remover(id: string) {
    this.formularioService.removerFormulario(id).subscribe(() => {
      this.carregarFormulario();
    });
  }

  carregarFormulario() {
    this.formularioService.obterTodasFormularios().subscribe((result: any) => {
      this.formularios = result.content;
    });
  }
}
