import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  providers: [InAppBrowser] // <-- Adicione esta linha
})
export class HomePage {
  violacoes = [
    {
      titulo: 'Violação de Privacidade',
      descricao: 'A violação de privacidade ocorre quando informações pessoais são coletadas, compartilhadas ou utilizadas sem consentimento. Isso inclui desde o rastreamento não autorizado de atividades online até vazamentos de dados sensíveis. Exemplos: Vazamento de dados pessoais, monitoramento não consentido, uso indevido de informações.'
    },
    {
      titulo: 'Cyberbullying e Assédio Online',
      descricao: 'É a prática de atos de violência psicológica, humilhação ou intimidação sistemática através de meios digitais. Pode causar danos emocionais profundos e até levar a consequências trágicas. Exemplos: Mensagens ofensivas, difamação, criação de perfis falsos para humilhar.'
    },
    {
      titulo: 'Ciberataques',
      descricao: 'Ciberataques são tentativas maliciosas de acessar, danificar ou interromper sistemas digitais, redes ou dispositivos. Podem ter motivações financeiras, políticas ou pessoais. Exemplos: Ransomware, phishing, DDoS, invasão de sistemas.'
    },
    {
      titulo: 'Discurso de Ódio Online',
      descricao: 'O discurso de ódio online envolve expressões que incitam violência, discriminação ou hostilidade contra indivíduos ou grupos baseados em características como raça, religião, gênero ou orientação sexual. Exemplos: Comentários racistas, homofóbicos, xenófobos ou misóginos.'
    },
    {
      titulo: 'Fraudes e Crimes Financeiros',
      descricao: 'Envolvem esquemas enganosos para obter ganhos financeiros ilícitos através de meios digitais, muitas vezes explorando vulnerabilidades humanas ou técnicas. Exemplos: Golpes de phishing, falsas oportunidades de investimento, roubo de identidade para fins financeiros.'
    },
    {
      titulo: 'Manipulação de Informações e Desinformação',
      descricao: 'A disseminação intencional de informações falsas ou enganosas pode manipular opiniões públicas, interferir em processos democráticos e causar danos sociais. Exemplos: Fake news, deepfakes, teorias da conspiração sem fundamento.'
    }
  ];

  constructor(private iab: InAppBrowser) {}

  abrirLink() {
    this.iab.create('https://www.kaspersky.com.br/resource-center/threats/what-is-cybercrime', '_system');
  }
}
