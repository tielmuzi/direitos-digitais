import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class DashboardPage implements OnInit {
  dadosQuestionarios: any[] = [];
  dadosRelatos: any[] = [];
  loading = true;
  chart: any;

  constructor(private dbService: DatabaseService) {
    Chart.register(...registerables);
  }

  async ngOnInit() {
    try {
      // Carrega os dados brutos
      this.dadosQuestionarios = await this.dbService.getQuestionarios();
      this.dadosRelatos = await this.dbService.getRelatos();

      // Cria os gráficos com agrupamento local
      this.criarGraficos();
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      this.loading = false;
    }
  }

  criarGraficos() {
    // Gráfico de faixa etária
    const ctx1 = document.getElementById('faixaEtariaChart') as HTMLCanvasElement;
    const faixaEtariaData = this.agruparPor('faixa_etaria', this.dadosQuestionarios);

    this.chart = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: Object.keys(faixaEtariaData),
        datasets: [{
          label: 'Participantes por Faixa Etária',
          data: Object.values(faixaEtariaData),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Gráfico de tipos de violação
    const ctx2 = document.getElementById('tiposViolacaoChart') as HTMLCanvasElement;
    const tiposViolacaoData = this.agruparPor('tipo', this.dadosRelatos);

    new Chart(ctx2, {
      type: 'pie',
      data: {
        labels: Object.keys(tiposViolacaoData),
        datasets: [{
          label: 'Tipos de Violação Reportados',
          data: Object.values(tiposViolacaoData),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  // Função do modelo antigo para agrupar dados
  agruparPor(propriedade: string, dados: any[]): {[key: string]: number} {
    return dados.reduce((acc, obj) => {
      const key = obj[propriedade];
      if (!key) return acc;

      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key]++;
      return acc;
    }, {});
  }

  get totalQuestionarios(): number {
    return this.dadosQuestionarios.length;
  }

  get totalRelatos(): number {
    return this.dadosRelatos.length;
  }
}
