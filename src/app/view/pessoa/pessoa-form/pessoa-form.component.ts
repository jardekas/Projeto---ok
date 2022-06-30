import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'typescript/lib/protocol';
import { CepService } from '../../../cep.service';
import { PessoaService } from '../../../pessoa.service';
import { MyValidators } from '../../../utils/myvalidators';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.css'],
})
export class PessoaFormComponent implements OnInit {
  estados: any[] = [
    { sigla: 'AC', estado: 'Acre' },
    { sigla: 'AL', estado: 'Alagoas' },
    { sigla: 'AP', estado: 'Amapá' },
    { sigla: 'AM', estado: 'Amazonas' },
    { sigla: 'BA', estado: 'Bahia' },
    { sigla: 'CE', estado: 'Ceara' },
    { sigla: 'DF', estado: 'Distrito Federal' },
    { sigla: 'ES', estado: 'Espírito Santo' },
    { sigla: 'GO', estado: 'Goiás' },
    { sigla: 'MA', estado: 'Maranhão' },
    { sigla: 'MT', estado: 'Mato Grosso' },
    { sigla: 'MS', estado: 'Mato Grosso do Sul' },
    { sigla: 'MG', estado: 'Minas Gerais' },
    { sigla: 'PA', estado: 'Pará' },
    { sigla: 'PB', estado: 'Paraíba' },
    { sigla: 'PR', estado: 'Paraná' },
    { sigla: 'PE', estado: 'Pernambuco' },
    { sigla: 'PI', estado: 'Piauí' },
    { sigla: 'RJ', estado: 'Rio de Janeiro' },
    { sigla: 'RN', estado: 'Rio Grande do Norte' },
    { sigla: 'RS', estado: 'Rio Grande do Sul' },
    { sigla: 'RO', estado: 'Rondônia' },
    { sigla: 'RR', estado: 'Roraima' },
    { sigla: 'SC', estado: 'Santa Catarina' },
    { sigla: 'SP', estado: 'São Paulo' },
    { sigla: 'SE', estado: 'Sergipe' },
    { sigla: 'TO', estado: 'Tocantins' },
  ];

  buttonLoading: boolean;

  editing: boolean;

  pessoaFormGroup = this.fb.group({
    id: [],
    nome: ['', [Validators.required]],
    idade: [
      null,
      [Validators.required, Validators.min(0), Validators.max(150)],
    ],
    cpf: ['', [MyValidators.isValidCpf, MyValidators.lengthRequired(11)]],
    email: ['', [Validators.email]],
    cep: ['', [MyValidators.lengthRequired(8)]],
    logradouro: ['', [Validators.required]],
    numero: [''],
    bairro: [''],
    cidade: ['', [Validators.required]],
    estado: ['', [Validators.required]],
  });

  constructor(
    public pessoaService: PessoaService,
    public cepService: CepService,
    public fb: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.getRouterId() != 'novo') {
      this.editing = true;
      this.pessoaService
        .obterPessoaPorId(this.getRouterId())
        .subscribe((result) => {
          this.pessoaFormGroup.setValue(result, { emitEvent: false });
        });
    }
    this.pessoaFormGroup.get('cep').valueChanges.subscribe((cep) => {
      if (this.pessoaFormGroup.get('cep').valid) {
        this.cepService.obterEnderecoPeloCEP(cep).subscribe((endereco: any) => {
          if (endereco.status == 200) {
            [
              { prop: 'logradouro', map: 'address' },
              { prop: 'cidade', map: 'city' },
              { prop: 'bairro', map: 'district' },
              { prop: 'estado', map: 'state' },
            ].forEach((obj) => {
              if (!this.pessoaFormGroup.get(obj.prop).value) {
                this.pessoaFormGroup.get(obj.prop).setValue(endereco[obj.map]);
                this.pessoaFormGroup.get(obj.prop).markAsDirty();
                //this.pessoaFormGroup.get(obj.prop).disable();
              }
            });
          }
        });
      }
    });
  }

  getRouterId(): string {
    return this.activatedRoute.snapshot.params['id'];
  }

  atualizar() {
    this.buttonLoading = true;
    this.pessoaService
      .atualizarPessoa(this.pessoaFormGroup.value)
      .subscribe((result) => {
        this.router.navigate(['/pessoa']);
      });
  }

  adicionar() {
    this.buttonLoading = true;
    this.pessoaService
      .salvarPessoa(this.pessoaFormGroup.value)
      .subscribe((result) => {
        this.router.navigate(['/pessoa']);
      });
  }
}
