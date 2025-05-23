import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async salvarQuestionario(dados: any): Promise<void> {
    const { data, error } = await this.supabase
      .from('questionarios')
      .insert([{
        faixa_etaria: dados.faixaEtaria,
        escolaridade: dados.escolaridade,
        genero: dados.genero,
        conhecimento_direitos_humanos: dados.conhecimentoDireitosHumanos,
        conhece_declaracao: dados.conheceDeclaracao,
        aplicacao_direitos: dados.aplicacaoDireitos,
        direitos_ameacados: dados.direitosAmeacados,
        preocupacao_dados: dados.preocupacaoDados,
        experiencia_negativa: dados.experienciaNegativa,
        responsabilidade: dados.responsabilidade,
        regulamentacao_atual: dados.regulamentacaoAtual,
        preocupacao_ia: dados.preocupacaoIA,
        aspectos_preocupantes_ia: dados.aspectosPreocupantesIA,
        educacao_direitos_digitais: dados.educacaoDireitosDigitais
      }]);

    if (error) {
      throw error;
    }
  }

  async salvarRelato(relato: any): Promise<void> {
    const { data, error } = await this.supabase
      .from('relatos')
      .insert([{
        tipo: relato.tipo,
        descricao: relato.descricao,
        quando_ocorreu: relato.quandoOcorreu,
        acoes_tomadas: relato.acoesTomadas,
        consequencias: relato.consequencias
      }]);

    if (error) {
      throw error;
    }
  }

  async getRelatos(): Promise<any[]> {
    const { data, error } = await this.supabase
      .from('relatos')
      .select('*');

    if (error) {
      throw error;
    }
    return data;
  }

  async getQuestionarios(): Promise<any[]> {
    const { data, error } = await this.supabase
      .from('questionarios')
      .select('*');

    if (error) {
      throw error;
    }
    return data;
  }

  async getEstatisticas(): Promise<any> {
    // Busque os questionários e relatos do banco
    const questionarios = await this.getQuestionarios();
    const relatos = await this.getRelatos();

    // Agrupe por faixa etária
    const faixaEtariaData: { faixa_etaria: string, count: number }[] = [];
    const faixaEtariaMap = new Map();
    questionarios.forEach((q: any) => {
      faixaEtariaMap.set(q.faixa_etaria, (faixaEtariaMap.get(q.faixa_etaria) || 0) + 1);
    });
    faixaEtariaMap.forEach((count, faixa_etaria) => {
      faixaEtariaData.push({ faixa_etaria, count });
    });

    // Agrupe por tipo de violação
    const tiposViolacaoData: { tipo: string, count: number }[] = [];
    const tiposMap = new Map();
    relatos.forEach((r: any) => {
      tiposMap.set(r.tipo, (tiposMap.get(r.tipo) || 0) + 1);
    });
    tiposMap.forEach((count, tipo) => {
      tiposViolacaoData.push({ tipo, count });
    });

    return {
      totalQuestionarios: questionarios.length,
      totalRelatos: relatos.length,
      faixaEtariaData,
      tiposViolacaoData
    };
  }
}
