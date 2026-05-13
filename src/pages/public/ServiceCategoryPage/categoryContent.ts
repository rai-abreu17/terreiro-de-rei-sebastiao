import type { FaqItem } from '../Home/FaqSection/FaqSection.types';

export type CategoriaPublicaSlug = 'consultas' | 'rituais';

interface CardFuncionamento {
  readonly rotulo: string;
  readonly valor: string;
}

interface DepoimentoCategoria {
  readonly texto: string;
  readonly autor: string;
}

export interface ConteudoCategoriaPublica {
  readonly descricaoCard: string;
  readonly tituloPagina: string;
  readonly subtituloPagina: string;
  readonly resumoHero: string;
  readonly sinais: readonly string[];
  readonly comoTitulo: string;
  readonly comoParagrafos: readonly string[];
  readonly tematicasTitulo: string;
  readonly tematicas: readonly string[];
  readonly funcionamentoTitulo: string;
  readonly funcionamentoCards: readonly CardFuncionamento[];
  readonly observacaoTitulo: string;
  readonly observacaoTexto: string;
  readonly conducaoTitulo: string;
  readonly conducaoTexto: string;
  readonly faqTitulo: string;
  readonly faqItens: readonly FaqItem[];
  readonly depoimentos: readonly DepoimentoCategoria[];
  readonly ctaTitulo: string;
  readonly ctaTexto: string;
}

const CONTEUDO_CATEGORIAS: Record<CategoriaPublicaSlug, ConteudoCategoriaPublica> = {
  consultas: {
    descricaoCard:
      'Jogos e leituras individuais para clareza, orientação e aprofundamento espiritual.',
    tituloPagina: 'Consultas Oraculares',
    subtituloPagina:
      'Leituras individuais para quem busca clareza, direção e reconexão com a própria intuição.',
    resumoHero:
      'As consultas do Terreiro acolhem questões do presente com escuta respeitosa e leitura fundamentada na ancestralidade.',
    sinais: [
      'Sente que está repetindo padrões familiares e deseja compreender melhor a própria história.',
      'Vive dúvidas importantes sobre decisões afetivas, profissionais ou espirituais.',
      'Percebe a espiritualidade pedindo mais escuta, presença e direção.',
      'Quer aprofundar a relação com a própria intuição e com a ancestralidade.',
    ],
    comoTitulo: 'Como é feito o atendimento',
    comoParagrafos: [
      'O atendimento oracular é realizado individualmente, com leitura fundamentada na ancestralidade e na escuta do momento vivido pelo consulente.',
      'Durante a sessão, acessamos sinais, orientações e pontos de atenção ligados ao presente, ao passado que ainda reverbera e aos movimentos que se anunciam no futuro.',
    ],
    tematicasTitulo: 'Temáticas que podem ser trabalhadas na sessão',
    tematicas: [
      'Ancestralidade e família',
      'Amor e relacionamentos',
      'Propósito de vida e trabalho',
      'Espiritualidade, intuição e travessias pessoais',
    ],
    funcionamentoTitulo: 'Como funciona a sessão',
    funcionamentoCards: [
      { rotulo: 'Formato', valor: 'Por videochamada ou presencial' },
      { rotulo: 'Duração', valor: 'Em média 60 a 70 minutos' },
      { rotulo: 'Canal', valor: 'Google Meet ou atendimento na Casa' },
      { rotulo: 'Postura', valor: 'Escuta sensível e orientação direta' },
    ],
    observacaoTitulo: 'Observação importante',
    observacaoTexto:
      'Este não é um espaço para respostas fechadas de “sim” ou “não”, nem para alimentar projeções pessoais. A consulta convida à consciência, à responsabilidade e à reconexão com a própria verdade.',
    conducaoTitulo: 'Quem conduz o trabalho',
    conducaoTexto:
      'Os atendimentos são realizados sob os fundamentos do Terreiro de Rei Sebastião, com reverência à Encantaria Maranhense, à escuta do consulente e ao tempo próprio de cada processo espiritual.',
    faqTitulo: 'Perguntas frequentes sobre consultas',
    faqItens: [
      {
        id: 'consultas-faq-1',
        pergunta: 'Como escolho entre búzios, tarot e cartas?',
        resposta: 'Na página de cada trabalho você encontra a proposta principal de leitura. Se ainda houver dúvida, a indicação pode ser feita com base no momento que deseja compreender com mais profundidade.',
      },
      {
        id: 'consultas-faq-2',
        pergunta: 'Preciso levar perguntas prontas para a consulta?',
        resposta: 'Pode levar uma questão central, mas não é obrigatório chegar com tudo definido. A sessão também acolhe situações em que o consulente sente apenas a necessidade de clareza e direção.',
      },
      {
        id: 'consultas-faq-3',
        pergunta: 'Recebo orientação prática durante a leitura?',
        resposta: 'Sim. A leitura busca traduzir os sinais em orientação compreensível, com apontamentos que ajudem o consulente a observar escolhas, posturas e movimentos importantes do próprio caminho.',
      },
    ],
    depoimentos: [
      {
        texto:
          'Saí do atendimento com uma clareza que não tinha há muito tempo. As orientações trouxeram luz sobre caminhos que eu não conseguia enxergar sozinha. Gratidão profunda pela escuta e pela condução com tanto respeito.',
        autor: 'Ana Luíza M.',
      },
      {
        texto:
          'O trabalho realizado no Terreiro de Rei Sebastião me ajudou a compreender padrões familiares que carregava sem perceber. A abordagem é séria, fundamentada e ao mesmo tempo muito acolhedora.',
        autor: 'Carla F.',
      },
      {
        texto:
          'Fui com muitas dúvidas e voltei com direcionamento. Sinto que finalmente encontrei um espaço de verdade para cuidar da minha espiritualidade e da minha ancestralidade.',
        autor: 'Mariana T.',
      },
    ],
    ctaTitulo: 'Se a escuta já começou, o caminho também pode começar a se revelar',
    ctaTexto:
      'Escolha o trabalho que mais conversa com seu momento e siga para o agendamento com calma e consciência.',
  },
  rituais: {
    descricaoCard:
      'Trabalhos conduzidos com fundamento para harmonização, proteção e abertura de caminhos.',
    tituloPagina: 'Rituais Espirituais',
    subtituloPagina:
      'Trabalhos de harmonização, proteção e abertura de caminhos, realizados com fundamento e resguardo.',
    resumoHero:
      'Os rituais são organizados a partir da necessidade espiritual apresentada, respeitando o tempo da Casa e a orientação recebida.',
    sinais: [
      'Sente o caminho travado e percebe a necessidade de reorganização espiritual.',
      'Busca proteção, firmeza e resguardo para atravessar um período delicado.',
      'Reconhece a importância de uma limpeza espiritual conduzida com seriedade.',
      'Vive uma fase de transição e deseja atravessá-la com amparo e fundamento.',
    ],
    comoTitulo: 'Como é conduzido o ritual',
    comoParagrafos: [
      'Os rituais são orientados conforme a necessidade apresentada pelo consulente e pela leitura espiritual realizada na Casa. Cada trabalho respeita o fundamento próprio, o preparo necessário e o tempo da condução ritualística.',
      'A condução acontece com resguardo, definição prévia do trabalho indicado e orientações claras sobre preparação, postura e cuidados antes e depois do ritual.',
    ],
    tematicasTitulo: 'Situações em que os rituais podem apoiar',
    tematicas: [
      'Abertura de caminhos e reorganização espiritual',
      'Proteção e fortalecimento do campo energético',
      'Limpeza e harmonização de ciclos pessoais',
      'Firmeza espiritual para travessias importantes',
    ],
    funcionamentoTitulo: 'Como funciona o ritual',
    funcionamentoCards: [
      { rotulo: 'Formato', valor: 'Condução presencial na Casa' },
      { rotulo: 'Preparação', valor: 'Orientada individualmente antes do trabalho' },
      { rotulo: 'Condução', valor: 'Materiais e fundamentos definidos conforme o ritual' },
      { rotulo: 'Acompanhamento', valor: 'Instruções claras de resguardo e continuidade' },
    ],
    observacaoTitulo: 'Observação importante',
    observacaoTexto:
      'Cada ritual respeita fundamento, tempo e preparação. Não se trata de promessa imediata, mas de um trabalho sério de reorganização e amparo espiritual, realizado com responsabilidade e reverência.',
    conducaoTitulo: 'Quem conduz o trabalho',
    conducaoTexto:
      'Os rituais são realizados sob a guarda do Terreiro de Rei Sebastião, com respeito à Encantaria, à tradição do Tambor de Mina e à seriedade necessária para cada fundamento espiritual.',
    faqTitulo: 'Perguntas frequentes sobre rituais',
    faqItens: [
      {
        id: 'rituais-faq-1',
        pergunta: 'Como sei qual ritual é o mais indicado?',
        resposta: 'A indicação nasce da escuta do caso e da leitura espiritual realizada pela Casa. O objetivo é evitar escolhas apressadas e respeitar o fundamento apropriado para cada situação.',
      },
      {
        id: 'rituais-faq-2',
        pergunta: 'Existe preparação antes do ritual?',
        resposta: 'Sim. Cada trabalho pode pedir orientações específicas de postura, resguardo ou preparo. Essas informações são passadas com antecedência, conforme a necessidade do ritual marcado.',
      },
      {
        id: 'rituais-faq-3',
        pergunta: 'Os rituais são feitos online?',
        resposta: 'Os rituais desta categoria são conduzidos presencialmente na Casa, porque o fundamento, os materiais e o resguardo do trabalho pedem presença no espaço ritual.',
      },
    ],
    depoimentos: [
      {
        texto:
          'O trabalho realizado no Terreiro de Rei Sebastião me ajudou a compreender padrões familiares que carregava sem perceber. A abordagem é séria, fundamentada e ao mesmo tempo muito acolhedora.',
        autor: 'Carla F.',
      },
      {
        texto:
          'Fui com muitas dúvidas e voltei com direcionamento. O atendimento foi preciso e respeitoso. Sinto que finalmente encontrei um espaço de verdade para cuidar da minha espiritualidade.',
        autor: 'Mariana T.',
      },
      {
        texto:
          'Saí do trabalho com mais serenidade e com a sensação de que as coisas voltaram a encontrar lugar dentro de mim. Houve muito respeito, clareza e fundamento em cada orientação recebida.',
        autor: 'Beatriz S.',
      },
    ],
    ctaTitulo: 'Quando há fundamento, o caminho se organiza com mais firmeza',
    ctaTexto:
      'Conheça os rituais disponíveis nesta categoria e siga para o agendamento do trabalho indicado para o seu momento.',
  },
};

export function getCategoryContent(slug: string): ConteudoCategoriaPublica | null {
  if (slug === 'consultas' || slug === 'rituais') {
    return CONTEUDO_CATEGORIAS[slug];
  }

  return null;
}