import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { testeService } from '../../../teste.service';

@Component({
  selector: 'app-teste-view',
  templateUrl: './teste-view.component.html',
  styleUrls: ['./teste-view.component.css'],
})
export class TesteViewComponent implements OnInit {
  teste: any;

  testeGroup: FormGroup;

  constructor(
    public activatedRoute: ActivatedRoute,
    public testeService: testeService
  ) {}

  ngOnInit() {
    this.testeService
      .obtertestePorId(this.getRouterId())
      .subscribe((result) => {
        this.teste = result;

        this.testeGroup = new FormGroup({});

        this.teste.questoes.forEach((questao) => {
          const control = new FormControl(
            null,
            questao.requerido ? Validators.required : []
          );
          this.testeGroup.addControl(questao?.titulo, control);
        });
      });
  }

  getRouterId(): string {
    return this.activatedRoute.snapshot.params['id'];
  }
}
