import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PropostasService, Proposta } from '../propostas/propostas.service';

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {
  proposta: Proposta | null = null;

  constructor(
    private route: ActivatedRoute,
    private propostasService: PropostasService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.propostasService.getPropostaById(id!).subscribe({
        next: proposta => this.proposta = proposta,
        error: err => console.error('Erro ao carregar proposta:', err)
      });
    }
  }
}

