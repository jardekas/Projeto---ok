import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormularioService } from '../../../formulario.service';

@Component({
  selector: 'app-formulario-view',
  templateUrl: './formulario-view.component.html',
  styleUrls: ['./formulario-view.component.css'],
})
export class FormularioViewComponent implements OnInit {
  formulario: any;

  formularioGroup: FormGroup;

  constructor(
    public activatedRoute: ActivatedRoute,
    public formularioService: FormularioService
  ) {}

  ngOnInit() {
    this.formularioService
      .obterFormularioPorId(this.getRouterId())
      .subscribe((result) => {
        this.formulario = result;

        this.formularioGroup = new FormGroup({});

        this.formulario.questoes.forEach((questao) => {
          const control = new FormControl(
            null,
            questao.requerido ? Validators.required : []
          );
          this.formularioGroup.addControl(questao?.titulo, control);
        });
      });
  }

  getRouterId(): string {
    return this.activatedRoute.snapshot.params['id'];
  }
}
