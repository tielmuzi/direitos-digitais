import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.page.html',
  styleUrls: ['./questionario.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class QuestionarioPage {
  formData = {
    faixaEtaria: '',
    escolaridade: '',
    genero: '',
    conhecimentoDireitosHumanos: 3,
    conheceDeclaracao: '',
    aplicacaoDireitos: '',
    direitosAmeacados: [] as string[],
    preocupacaoDados: 3,
    experienciaNegativa: '',
    responsabilidade: [] as string[],
    regulamentacaoAtual: '',
    preocupacaoIA: 3,
    aspectosPreocupantesIA: [] as string[],
    educacaoDireitosDigitais: ''
  };

  direitosAmeacadosOptions = [
    'Privacidade',
    'Liberdade de expressão',
    'Acesso à informação',
    'Direito ao esquecimento',
    'Igualdade e não discriminação',
    'Direito à educação',
    'Proteção contra violência e assédio'
  ];

  responsabilidadeOptions = [
    'Governos e órgãos reguladores',
    'Empresas de tecnologia',
    'Organizações internacionais',
    'Cada indivíduo',
    'Sociedade civil organizada'
  ];

  aspectosIAOptions = [
    'Vieses e discriminação algorítmica',
    'Substituição de empregos',
    'Vigilância em massa',
    'Manipulação de comportamento',
    'Concentração de poder nas grandes empresas de tecnologia',
    'Armas autônomas',
    'Desinformação automatizada'
  ];

  constructor(private dbService: DatabaseService) {}

  toggleSelection(array: string[], item: string) {
    const index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    } else {
      array.push(item);
    }
  }

  isSelected(array: string[], item: string): boolean {
    return array.includes(item);
  }

  async enviarQuestionario() {
    try {
      await this.dbService.salvarQuestionario(this.formData);
      alert('Questionário enviado com sucesso! Obrigado por sua contribuição.');
      // Limpar formulário ou navegar para outra página
    } catch (error) {
      console.error('Erro ao enviar questionário:', error);
      alert('Ocorreu um erro ao enviar o questionário. Por favor, tente novamente.');
    }
  }
}
