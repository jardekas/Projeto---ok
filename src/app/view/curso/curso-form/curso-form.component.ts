import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'typescript/lib/protocol';
import { CursoService } from '../../../curso.service';
import { MyValidators } from '../../../utils/myvalidators';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.css'],
})
export class CursoFormComponent implements OnInit {
  buttonLoading: boolean;

  editing: boolean;

  cursoFormGroup = this.fb.group({
    id: [],
    nome: ['', [Validators.required]],
    cargaHoraria: [
      null,
      [Validators.required, Validators.min(40), Validators.max(999)],
    ],
    dataInicio: ['', [Validators.required]],
    dataFim: ['', [Validators.required]],
    grade: [[], MyValidators.minSize(1)],
  });

  gradeFormGroup = this.fb.group({
    materia: ['', Validators.required],
    resumo: ['', Validators.minLength(5)],
  });

  constructor(
    public cursoService: CursoService,
    public fb: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.getRouterId() != 'novo') {
      this.editing = true;
      this.cursoService
        .obterCursoPorId(this.getRouterId())
        .subscribe((result) => {
          this.cursoFormGroup.setValue(result, { emitEvent: false });
        });
    }
  }

  getRouterId(): string {
    return this.activatedRoute.snapshot.params['id'];
  }

  atualizar() {
    this.buttonLoading = true;
    this.cursoService
      .atualizarCurso(this.cursoFormGroup.value)
      .subscribe((result) => {
        this.router.navigate(['/curso']);
      });
  }

  addGrade() {
    if (this.gradeFormGroup.valid) {
      this.cursoFormGroup
        .get('grade')
        .value.push(this.gradeFormGroup.value);
      this.cursoFormGroup.get('grade').updateValueAndValidity();
      this.gradeFormGroup.reset({ materia: '', resumo: '' });
    }
  }

  adicionar() {
    this.buttonLoading = true;
    this.cursoService
      .salvarCurso(this.cursoFormGroup.value)
      .subscribe((result) => {
        this.router.navigate(['/curso']);
      });
  }
}
