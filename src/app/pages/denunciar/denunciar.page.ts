import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-denunciar',
  templateUrl: './denunciar.page.html',
  styleUrls: ['./denunciar.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  providers: [InAppBrowser] // <-- Adicione esta linha
})
export class DenunciarPage {
  constructor(private iab: InAppBrowser) {}

  abrirLinkDenuncia() {
    this.iab.create('https://www.gov.br/pf/pt-br/canais_atendimento/comunicacao-de-crimes', '_system');
  }
}
