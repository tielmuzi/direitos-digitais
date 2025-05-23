import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-relatos',
  templateUrl: './relatos.page.html',
  styleUrls: ['./relatos.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class RelatosPage {
  relato = {
    tipo: '',
    descricao: '',
    quandoOcorreu: '',
    acoesTomadas: '',
    consequencias: ''
  };

  tiposViolacao = [
    'Cyberbullying',
    'Assédio Online',
    'Invasão de Privacidade',
    'Vazamento de Dados',
    'Discurso de Ódio',
    'Fraude Digital',
    'Outro'
  ];

  constructor(private dbService: DatabaseService) {}

  async enviarRelato() {
    try {
      console.log('Enviando relato:', this.relato);
      await this.dbService.salvarRelato(this.relato);
      alert('Seu relato foi registrado de forma anônima. Obrigado por contribuir!');
      this.relato = {
        tipo: '',
        descricao: '',
        quandoOcorreu: '',
        acoesTomadas: '',
        consequencias: ''
      };
    } catch (error) {
      console.error('Erro ao enviar relato:', error);
      alert('Ocorreu um erro ao enviar seu relato. Por favor, tente novamente.');
    }
  }
}
