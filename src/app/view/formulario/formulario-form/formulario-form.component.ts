import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioService } from '../../../formulario.service';
import { MyValidators } from '../../../utils/myvalidators';

@Component({
  selector: 'app-formulario-form',
  templateUrl: './formulario-form.component.html',
  styleUrls: ['./formulario-form.component.css'],
})
export class FormularioFormComponent implements OnInit {
  formularioFormGroup = this.fb.group({
    id: [null],
    titulo: [null, Validators.required],
    descricao: [null, Validators.required],
    questoes: [[], MyValidators.minSize(1)],
  });

  questaoFormGroup = this.fb.group({
    titulo: [null, Validators.required],
    tipo: [null, Validators.required],
    requerido: [false],
    opcoes: [[]],
  });

  opcoesFormGroup = this.fb.group({
    valor: ['', Validators.required],
  });

  editing: boolean;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public formularioService: FormularioService
  ) {}

  ngOnInit() {
    if (this.getRouterId() != 'novo') {
      this.editing = true;
      this.formularioService
        .obterFormularioPorId(this.getRouterId())
        .subscribe((result) => {
          this.formularioFormGroup.setValue(result);
        });
    }
  }

  getRouterId(): string {
    return this.activatedRoute.snapshot.params['id'];
  }

  addQuestao() {
    if (this.questaoFormGroup.valid) {
      this.formularioFormGroup
        .get('questoes')
        .value.push(this.questaoFormGroup.value);
      this.formularioFormGroup.get('questoes').updateValueAndValidity();
      this.questaoFormGroup.reset({ opcoes: [], requerido: false });
    }
  }

  addOpcao() {
    this.questaoFormGroup.get('opcoes').value.push(this.opcoesFormGroup.value);
    this.opcoesFormGroup.reset();
  }

  salvar() {
    this.formularioService
      .salvarFormulario(this.formularioFormGroup.value)
      .subscribe((result) => {
        this.router.navigate(['/formulario']);
      });
  }

  atualizar() {
    this.formularioService
      .atualizarFormulario(this.formularioFormGroup.value)
      .subscribe((result) => {
        this.router.navigate(['/formulario']);
      });
  }
}
