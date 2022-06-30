import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { testeService } from '../../../teste.service';
import { MyValidators } from '../../../utils/myvalidators';

@Component({
  selector: 'app-teste-form',
  templateUrl: './teste-form.component.html',
  styleUrls: ['./teste-form.component.css'],
})
export class TesteFormComponent implements OnInit {
  testeFormGroup = this.fb.group({
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
    public testeService: testeService
  ) {}

  ngOnInit() {
    if (this.getRouterId() != 'novo') {
      this.editing = true;
      this.testeService
        .obtertestePorId(this.getRouterId())
        .subscribe((result) => {
          this.testeFormGroup.setValue(result);
        });
    }
  }

  getRouterId(): string {
    return this.activatedRoute.snapshot.params['id'];
  }

  addQuestao() {
    if (this.questaoFormGroup.valid) {
      this.testeFormGroup
        .get('questoes')
        .value.push(this.questaoFormGroup.value);
      this.testeFormGroup.get('questoes').updateValueAndValidity();
      this.questaoFormGroup.reset({ opcoes: [], requerido: false });
    }
  }

  addOpcao() {
    this.questaoFormGroup.get('opcoes').value.push(this.opcoesFormGroup.value);
    this.opcoesFormGroup.reset();
  }

  salvar() {
    this.testeService
      .salvarteste(this.testeFormGroup.value)
      .subscribe((result) => {
        this.router.navigate(['/teste']);
      });
  }

  atualizar() {
    this.testeService
      .atualizarteste(this.testeFormGroup.value)
      .subscribe((result) => {
        this.router.navigate(['/teste']);
      });
  }
}
