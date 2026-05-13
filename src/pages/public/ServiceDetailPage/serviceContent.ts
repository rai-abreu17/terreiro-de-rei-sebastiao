import type { FaqItem } from '../Home/FaqSection/FaqSection.types';
import type { CategoriaPublicaSlug } from '../ServiceCategoryPage/categoryContent';

interface CardFuncionamento {
  readonly rotulo: string;
  readonly valor: string;
}

export interface ConteudoServicoPublico {
  readonly categoriaSlug: CategoriaPublicaSlug;
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
  readonly faqTitulo: string;
  readonly faqItens: readonly FaqItem[];
  readonly ctaTitulo: string;
  readonly ctaTexto: string;
}

const CONTEUDO_POR_SERVICO: Record<string, ConteudoServicoPublico> = {
  'consulta-buzios-demo': {
    categoriaSlug: 'consultas',
    subtituloPagina:
      'Leitura com búzios para orientar decisões, compreender travessias e escutar o que pede clareza no presente.',
    resumoHero:
      'A consulta com búzios busca leitura objetiva e respeitosa do momento vivido, acolhendo dúvidas, encruzilhadas e caminhos que pedem direção.',
    sinais: [
      'Há decisões importantes em curso e você sente necessidade de confirmação espiritual.',
      'Situações repetidas vêm se apresentando e pedem leitura mais profunda do caminho.',
      'Você deseja compreender melhor um momento de encruzilhada, escolha ou travessia.',
    ],
    comoTitulo: 'Como acontece a leitura com búzios',
    comoParagrafos: [
      'O jogo com búzios é conduzido com escuta atenta ao momento do consulente e leitura fundamentada na ancestralidade da Casa.',
      'A sessão busca traduzir os sinais recebidos em orientação compreensível, sem dramatização e sem respostas apressadas.',
    ],
    tematicasTitulo: 'Questões frequentemente trabalhadas neste atendimento',
    tematicas: [
      'Decisões afetivas e familiares',
      'Escolhas profissionais e mudanças de rumo',
      'Direção espiritual e proteção do caminho',
      'Ciclos que se repetem e pedem entendimento',
    ],
    funcionamentoTitulo: 'O que você encontra nesta sessão',
    funcionamentoCards: [
      { rotulo: 'Leitura', valor: 'Direta, simbólica e orientadora' },
      { rotulo: 'Foco', valor: 'Questões do presente e movimentos do caminho' },
      { rotulo: 'Tom', valor: 'Clareza com acolhimento e fundamento' },
      { rotulo: 'Entrega', valor: 'Leitura e orientação ao fim da sessão' },
    ],
    observacaoTitulo: 'Observação importante',
    observacaoTexto:
      'O jogo de búzios não substitui responsabilidade pessoal nem deve ser tratado como atalho para terceirizar escolhas. A leitura orienta; o caminho continua a ser vivido pelo consulente.',
    faqTitulo: 'Perguntas frequentes sobre a consulta com búzios',
    faqItens: [
      {
        id: 'buzios-faq-1',
        pergunta: 'Posso levar mais de um tema para o jogo de búzios?',
        resposta: 'Sim, mas é recomendável chegar com uma prioridade clara. Isso ajuda a dar profundidade à leitura e evita dispersão durante a sessão.',
      },
      {
        id: 'buzios-faq-2',
        pergunta: 'A consulta traz resposta definitiva sobre tudo?',
        resposta: 'Não. A leitura oferece direção, pontos de atenção e entendimento do momento, sempre respeitando o tempo de cada processo e a responsabilidade do consulente.',
      },
      {
        id: 'buzios-faq-3',
        pergunta: 'Preciso ter experiência espiritual para fazer esta consulta?',
        resposta: 'Não. O atendimento acolhe tanto quem já caminha na espiritualidade quanto quem está buscando entendimento pela primeira vez.',
      },
    ],
    ctaTitulo: 'Quando a direção aparece, o próximo passo pode ser dado com mais firmeza',
    ctaTexto:
      'Se este atendimento conversa com o seu momento, siga para o agendamento e escolha o melhor horário.',
  },
  'consulta-tarot': {
    categoriaSlug: 'consultas',
    subtituloPagina:
      'Leitura de tarot para ampliar percepção, compreender contextos e enxergar com mais clareza os movimentos do presente.',
    resumoHero:
      'A consulta de tarot ajuda a organizar a leitura de cenários, emoções e possibilidades, trazendo direção para temas que ainda parecem embaralhados.',
    sinais: [
      'Você precisa compreender melhor uma situação antes de agir.',
      'Há excesso de dúvida e pouca clareza sobre o próximo passo.',
      'Questões afetivas, profissionais ou emocionais pedem leitura mais estruturada.',
    ],
    comoTitulo: 'Como acontece a leitura de tarot',
    comoParagrafos: [
      'A sessão é conduzida com foco na compreensão do momento, combinando escuta, leitura simbólica e tradução prática do que as cartas apresentam.',
      'O tarot ajuda a observar contextos, tendências e pontos de cuidado, sem cair em fatalismo nem em respostas prontas.',
    ],
    tematicasTitulo: 'Temas muito presentes nesta leitura',
    tematicas: [
      'Relacionamentos e vínculos afetivos',
      'Escolhas profissionais e reorganização de rota',
      'Saúde emocional e direção do momento',
      'Padrões de repetição e tomada de consciência',
    ],
    funcionamentoTitulo: 'O que esta consulta privilegia',
    funcionamentoCards: [
      { rotulo: 'Leitura', valor: 'Cenários, padrões e tendências' },
      { rotulo: 'Foco', valor: 'Compreensão do presente e do entorno' },
      { rotulo: 'Tom', valor: 'Reflexivo, claro e objetivo' },
      { rotulo: 'Entrega', valor: 'Leitura com síntese orientadora' },
    ],
    observacaoTitulo: 'Observação importante',
    observacaoTexto:
      'O tarot não deve ser usado para alimentar ansiedade ou vigilância sobre a vida alheia. A proposta da sessão é devolver clareza ao consulente sobre si, seus contextos e suas escolhas.',
    faqTitulo: 'Perguntas frequentes sobre a consulta de tarot',
    faqItens: [
      {
        id: 'tarot-faq-1',
        pergunta: 'A consulta de tarot serve apenas para temas amorosos?',
        resposta: 'Não. Embora relacione vínculos afetivos com profundidade, a leitura também acolhe temas de trabalho, família, travessias emocionais e decisões importantes.',
      },
      {
        id: 'tarot-faq-2',
        pergunta: 'O tarot prevê datas exatas?',
        resposta: 'O foco da leitura está em tendências, contextos e movimentos, não em prometer datas exatas ou certezas absolutas.',
      },
      {
        id: 'tarot-faq-3',
        pergunta: 'Posso fazer a consulta mesmo estando emocionalmente confusa?',
        resposta: 'Sim. Muitas pessoas procuram o tarot justamente em momentos de confusão. A sessão ajuda a organizar a percepção com mais serenidade.',
      },
    ],
    ctaTitulo: 'Clareza também é uma forma de cuidado',
    ctaTexto:
      'Se esta leitura faz sentido para você agora, siga para o agendamento e escolha a melhor data.',
  },
  'consulta-cartas': {
    categoriaSlug: 'consultas',
    subtituloPagina:
      'Tiragem com cartas para orientar questões afetivas, profissionais e espirituais com leitura sensível e direta.',
    resumoHero:
      'A consulta com cartas oferece uma leitura acolhedora para quem deseja compreender sentimentos, contextos e decisões com mais nitidez.',
    sinais: [
      'Há assuntos afetivos ou familiares que pedem leitura mais delicada.',
      'Você busca orientação direta, mas com linguagem sensível e acessível.',
      'Existe necessidade de reorganizar a percepção sobre pessoas, vínculos e escolhas.',
    ],
    comoTitulo: 'Como acontece a tiragem com cartas',
    comoParagrafos: [
      'A sessão usa a tiragem como apoio para compreender movimentos emocionais, vínculos e contextos pessoais de forma objetiva e acolhedora.',
      'As cartas ajudam a nomear o que está em curso, iluminando padrões e direções possíveis para a travessia do consulente.',
    ],
    tematicasTitulo: 'Assuntos que podem ser trabalhados neste jogo',
    tematicas: [
      'Relacionamentos e vínculos familiares',
      'Escolhas do cotidiano e encruzilhadas práticas',
      'Autoimagem, merecimento e direção pessoal',
      'Momentos de transição e reorganização interior',
    ],
    funcionamentoTitulo: 'O que marca esta consulta',
    funcionamentoCards: [
      { rotulo: 'Leitura', valor: 'Sensível e aplicada ao cotidiano' },
      { rotulo: 'Foco', valor: 'Vínculos, decisões e travessias pessoais' },
      { rotulo: 'Tom', valor: 'Acolhedor, claro e objetivo' },
      { rotulo: 'Entrega', valor: 'Direção com linguagem acessível' },
    ],
    observacaoTitulo: 'Observação importante',
    observacaoTexto:
      'A tiragem com cartas não existe para vigiar o outro, e sim para devolver entendimento sobre o próprio caminho, a própria postura e as relações que pedem consciência.',
    faqTitulo: 'Perguntas frequentes sobre a consulta de cartas',
    faqItens: [
      {
        id: 'cartas-faq-1',
        pergunta: 'Qual a diferença entre esta consulta e o tarot?',
        resposta: 'Ambas são leituras oraculares, mas cada trabalho tem uma linguagem própria. Esta tiragem privilegia uma escuta sensível e aplicada ao cotidiano do consulente.',
      },
      {
        id: 'cartas-faq-2',
        pergunta: 'É uma boa consulta para quem nunca fez leitura antes?',
        resposta: 'Sim. A linguagem é acessível e o atendimento é conduzido com clareza, o que torna a experiência acolhedora também para quem está começando.',
      },
      {
        id: 'cartas-faq-3',
        pergunta: 'Posso usar a consulta para compreender uma relação específica?',
        resposta: 'Sim. Questões relacionais podem ser trabalhadas, sempre com foco no entendimento do vínculo e no que isso mobiliza no próprio consulente.',
      },
    ],
    ctaTitulo: 'Às vezes, compreender o que se sente já muda o rumo da caminhada',
    ctaTexto:
      'Se este trabalho se aproxima do que você vive agora, siga para o agendamento.',
  },
  'ritual-limpeza-demo': {
    categoriaSlug: 'rituais',
    subtituloPagina:
      'Ritual de limpeza espiritual voltado à harmonização do campo, ao descarrego de excessos e à reorganização do ciclo vivido.',
    resumoHero:
      'Este trabalho é indicado quando há sensação de peso, repetição de desgaste ou necessidade de reorganização espiritual com fundamento e resguardo.',
    sinais: [
      'Você percebe cansaço persistente, peso espiritual ou ambiente carregado.',
      'Há sensação de travamento, desgaste e dificuldade de retomar o próprio eixo.',
      'O momento pede limpeza, serenidade e reorganização do campo.',
    ],
    comoTitulo: 'Como é conduzido o ritual de limpeza',
    comoParagrafos: [
      'O trabalho é realizado presencialmente, com fundamento próprio e preparo orientado conforme a necessidade apresentada.',
      'A limpeza busca retirar excessos, aliviar o campo e favorecer reorganização espiritual com respeito ao tempo da Casa.',
    ],
    tematicasTitulo: 'Quando este ritual costuma ser buscado',
    tematicas: [
      'Sensação de peso e exaustão espiritual',
      'Ambientes ou ciclos que parecem muito carregados',
      'Necessidade de reorganização antes de novos passos',
      'Encerramento de fases desgastantes',
    ],
    funcionamentoTitulo: 'O que este ritual mobiliza',
    funcionamentoCards: [
      { rotulo: 'Trabalho', valor: 'Limpeza e harmonização do campo' },
      { rotulo: 'Foco', valor: 'Alívio de peso e reorganização espiritual' },
      { rotulo: 'Postura', valor: 'Presença, preparo e resguardo' },
      { rotulo: 'Continuidade', valor: 'Orientações após a condução' },
    ],
    observacaoTitulo: 'Observação importante',
    observacaoTexto:
      'Limpeza espiritual não é “apagamento mágico” de problemas. O ritual cria condição de reorganização, mas pede continuidade, escuta e responsabilidade no viver diário.',
    faqTitulo: 'Perguntas frequentes sobre o ritual de limpeza espiritual',
    faqItens: [
      {
        id: 'limpeza-faq-1',
        pergunta: 'Como saber se este ritual é o mais indicado?',
        resposta: 'A indicação depende da escuta do caso e da orientação da Casa. A sensação de peso pode ser um sinal, mas o fundamento do trabalho é sempre avaliado com cuidado.',
      },
      {
        id: 'limpeza-faq-2',
        pergunta: 'Preciso fazer algum preparo antes do ritual?',
        resposta: 'Sim. Quando o trabalho é confirmado, a Casa informa as orientações de preparo e resguardo apropriadas para este atendimento.',
      },
      {
        id: 'limpeza-faq-3',
        pergunta: 'Existe orientação depois da limpeza?',
        resposta: 'Sim. Após o ritual, são passadas instruções de continuidade e cuidado para sustentar a reorganização do campo.',
      },
    ],
    ctaTitulo: 'Quando o campo se reorganiza, a travessia também muda de qualidade',
    ctaTexto:
      'Se este ritual faz sentido para o seu momento, siga para o agendamento e veja a disponibilidade.',
  },
  'ritual-abertura-caminhos': {
    categoriaSlug: 'rituais',
    subtituloPagina:
      'Ritual voltado à abertura de caminhos, à reorganização de travas e ao fortalecimento do movimento espiritual do consulente.',
    resumoHero:
      'Este trabalho é procurado quando a vida parece estagnada e o consulente reconhece necessidade de reorganização com fundamento, direção e firmeza.',
    sinais: [
      'Você sente que os passos não avançam, mesmo com esforço e intenção.',
      'Há repetição de travas em áreas importantes da vida.',
      'O momento pede destravamento e renovação de movimento.',
    ],
    comoTitulo: 'Como é conduzido o ritual de abertura de caminhos',
    comoParagrafos: [
      'O ritual é realizado na Casa, com fundamento específico para mobilizar abertura, reorganização e fortalecimento do caminhar do consulente.',
      'Antes da condução, são observadas a necessidade do caso, a preparação adequada e o momento mais apropriado para o trabalho.',
    ],
    tematicasTitulo: 'Situações em que este ritual costuma ser buscado',
    tematicas: [
      'Sensação de travamento prolongado',
      'Ciclos que não avançam apesar do esforço',
      'Necessidade de abrir movimento em novas fases',
      'Retomada de direção com mais firmeza',
    ],
    funcionamentoTitulo: 'O que este ritual prioriza',
    funcionamentoCards: [
      { rotulo: 'Trabalho', valor: 'Abertura e reorganização do caminho' },
      { rotulo: 'Foco', valor: 'Destrave e movimento espiritual' },
      { rotulo: 'Postura', valor: 'Preparação e resguardo individual' },
      { rotulo: 'Continuidade', valor: 'Orientações de sustentação após o rito' },
    ],
    observacaoTitulo: 'Observação importante',
    observacaoTexto:
      'Abertura de caminhos não é promessa instantânea de resultado. O ritual trabalha condições espirituais de movimento e pede coerência entre fundamento, postura e continuidade.',
    faqTitulo: 'Perguntas frequentes sobre o ritual de abertura de caminhos',
    faqItens: [
      {
        id: 'abertura-faq-1',
        pergunta: 'Este ritual serve para qualquer área da vida?',
        resposta: 'Ele pode apoiar diferentes travessias, mas a indicação concreta depende do caso apresentado e da leitura espiritual feita na Casa.',
      },
      {
        id: 'abertura-faq-2',
        pergunta: 'Existe um momento melhor para realizar este trabalho?',
        resposta: 'Sim. O tempo do ritual é considerado com cuidado. Nem toda urgência pessoal corresponde ao melhor momento espiritual para a condução.',
      },
      {
        id: 'abertura-faq-3',
        pergunta: 'Recebo orientação sobre o que fazer depois?',
        resposta: 'Sim. O resguardo e as orientações posteriores fazem parte do trabalho para sustentar a abertura construída no ritual.',
      },
    ],
    ctaTitulo: 'Movimento com fundamento é diferente de pressa',
    ctaTexto:
      'Se este ritual responde ao que você vive, siga para o agendamento e veja a disponibilidade da Casa.',
  },
  'ritual-protecao': {
    categoriaSlug: 'rituais',
    subtituloPagina:
      'Ritual de proteção espiritual para fortalecer o campo, ampliar resguardo e firmar presença diante de períodos delicados.',
    resumoHero:
      'Este trabalho é indicado quando o consulente sente necessidade de firmeza, resguardo e fortalecimento espiritual para seguir com mais segurança.',
    sinais: [
      'Você sente o campo vulnerável e precisa de mais resguardo.',
      'Há sensação de exposição, instabilidade ou desgaste recorrente.',
      'O momento pede proteção e fortalecimento do próprio eixo espiritual.',
    ],
    comoTitulo: 'Como é conduzido o ritual de proteção',
    comoParagrafos: [
      'O ritual é realizado presencialmente, com fundamento voltado à proteção, à firmeza e ao fortalecimento do campo espiritual do consulente.',
      'A condução respeita o caso apresentado, o tempo da Casa e o preparo necessário para que o trabalho aconteça com seriedade.',
    ],
    tematicasTitulo: 'Quando este ritual costuma ser buscado',
    tematicas: [
      'Períodos de vulnerabilidade espiritual',
      'Necessidade de resguardo e fortalecimento',
      'Travessias delicadas que pedem mais firmeza',
      'Cuidado com o próprio campo e com a caminhada',
    ],
    funcionamentoTitulo: 'O que este ritual trabalha',
    funcionamentoCards: [
      { rotulo: 'Trabalho', valor: 'Proteção e firmeza espiritual' },
      { rotulo: 'Foco', valor: 'Resguardo do campo e fortalecimento' },
      { rotulo: 'Postura', valor: 'Preparação com responsabilidade' },
      { rotulo: 'Continuidade', valor: 'Cuidados orientados após o trabalho' },
    ],
    observacaoTitulo: 'Observação importante',
    observacaoTexto:
      'Proteção espiritual não deve ser confundida com invulnerabilidade. O ritual fortalece e resguarda, mas não dispensa consciência, postura e continuidade do cuidado.',
    faqTitulo: 'Perguntas frequentes sobre o ritual de proteção',
    faqItens: [
      {
        id: 'protecao-faq-1',
        pergunta: 'Este ritual é apenas para momentos graves?',
        resposta: 'Não. Ele pode ser buscado tanto em momentos delicados quanto em fases em que o consulente reconhece a necessidade de fortalecimento e resguardo preventivo.',
      },
      {
        id: 'protecao-faq-2',
        pergunta: 'Há recomendações de resguardo depois do ritual?',
        resposta: 'Sim. A Casa orienta os cuidados adequados depois da condução, para que a proteção firmada seja bem sustentada.',
      },
      {
        id: 'protecao-faq-3',
        pergunta: 'O ritual substitui outros cuidados espirituais e pessoais?',
        resposta: 'Não. Ele integra um cuidado mais amplo, que também passa por postura, discernimento e responsabilidade no cotidiano.',
      },
    ],
    ctaTitulo: 'Resguardo também é um modo de seguir com dignidade e firmeza',
    ctaTexto:
      'Se este ritual é o que o seu momento pede, siga para o agendamento e escolha a melhor data.',
  },
};

const FALLBACK_POR_CATEGORIA: Record<CategoriaPublicaSlug, ConteudoServicoPublico> = {
  consultas: {
    categoriaSlug: 'consultas',
    subtituloPagina:
      'Leitura individual para clareza, orientação e aprofundamento do momento vivido.',
    resumoHero:
      'Este atendimento acolhe questões importantes do presente com leitura respeitosa e orientação fundamentada.',
    sinais: [
      'Há uma questão central pedindo direção.',
      'Você sente necessidade de clareza espiritual e emocional.',
      'O momento pede leitura mais profunda do caminho.',
    ],
    comoTitulo: 'Como este atendimento é conduzido',
    comoParagrafos: [
      'A consulta é realizada individualmente, com escuta atenta e leitura fundamentada no momento apresentado pelo consulente.',
      'A sessão busca devolver clareza, direção e percepção sobre movimentos importantes da própria caminhada.',
    ],
    tematicasTitulo: 'Assuntos que podem ser trabalhados',
    tematicas: ['Ancestralidade', 'Relacionamentos', 'Trabalho', 'Travessias pessoais'],
    funcionamentoTitulo: 'O que você encontra nesta sessão',
    funcionamentoCards: [
      { rotulo: 'Leitura', valor: 'Clara e orientadora' },
      { rotulo: 'Foco', valor: 'Direção do momento vivido' },
      { rotulo: 'Tom', valor: 'Acolhimento com objetividade' },
      { rotulo: 'Entrega', valor: 'Leitura e síntese ao final' },
    ],
    observacaoTitulo: 'Observação importante',
    observacaoTexto:
      'A leitura orienta o caminho, mas não substitui responsabilidade pessoal nem processos de decisão do consulente.',
    faqTitulo: 'Perguntas frequentes sobre este atendimento',
    faqItens: [
      {
        id: 'consulta-generica-faq-1',
        pergunta: 'Preciso chegar com uma pergunta pronta?',
        resposta: 'Não é obrigatório, embora uma questão central possa ajudar a aprofundar a sessão.',
      },
      {
        id: 'consulta-generica-faq-2',
        pergunta: 'A consulta serve para quem nunca fez leitura?',
        resposta: 'Sim. O atendimento é conduzido com clareza e acolhimento também para quem está chegando pela primeira vez.',
      },
      {
        id: 'consulta-generica-faq-3',
        pergunta: 'Posso agendar online?',
        resposta: 'Sim. A disponibilidade é exibida no fluxo público de agendamento.',
      },
    ],
    ctaTitulo: 'Se esta leitura conversa com o seu momento, o próximo passo já pode ser dado',
    ctaTexto: 'Siga para o agendamento e escolha o melhor horário disponível.',
  },
  rituais: {
    categoriaSlug: 'rituais',
    subtituloPagina:
      'Trabalho espiritual conduzido com fundamento, preparo e resguardo.',
    resumoHero:
      'Este ritual é realizado conforme a necessidade apresentada e respeita o tempo próprio da condução espiritual.',
    sinais: [
      'Há sensação de travamento ou vulnerabilidade.',
      'O momento pede reorganização e firmeza espiritual.',
      'Você busca um trabalho conduzido com fundamento e resguardo.',
    ],
    comoTitulo: 'Como este trabalho é conduzido',
    comoParagrafos: [
      'O ritual é realizado presencialmente, com preparo adequado e atenção ao fundamento indicado para o momento.',
      'A condução inclui orientações de postura, resguardo e continuidade após o trabalho.',
    ],
    tematicasTitulo: 'Situações em que este trabalho pode apoiar',
    tematicas: ['Proteção', 'Harmonização', 'Abertura de caminhos', 'Firmeza espiritual'],
    funcionamentoTitulo: 'O que este ritual prioriza',
    funcionamentoCards: [
      { rotulo: 'Trabalho', valor: 'Condução com fundamento' },
      { rotulo: 'Foco', valor: 'Resguardo e reorganização' },
      { rotulo: 'Postura', valor: 'Preparação individual' },
      { rotulo: 'Continuidade', valor: 'Orientações após o rito' },
    ],
    observacaoTitulo: 'Observação importante',
    observacaoTexto:
      'O ritual não é promessa imediata, mas trabalho sério de cuidado espiritual que pede tempo, postura e continuidade.',
    faqTitulo: 'Perguntas frequentes sobre este ritual',
    faqItens: [
      {
        id: 'ritual-generico-faq-1',
        pergunta: 'O ritual exige preparo?',
        resposta: 'Sim. As orientações são passadas conforme o trabalho marcado e devem ser respeitadas com seriedade.',
      },
      {
        id: 'ritual-generico-faq-2',
        pergunta: 'O atendimento é presencial?',
        resposta: 'Sim. Os rituais desta categoria são conduzidos na Casa, com a presença do consulente.',
      },
      {
        id: 'ritual-generico-faq-3',
        pergunta: 'Recebo orientação depois do trabalho?',
        resposta: 'Sim. O resguardo e a continuidade fazem parte da condução ritualística.',
      },
    ],
    ctaTitulo: 'Quando há fundamento, o cuidado se torna mais firme',
    ctaTexto: 'Siga para o agendamento se este trabalho corresponde ao seu momento.',
  },
};

export function getServiceContent(
  slug: string,
  categoriaSlug?: CategoriaPublicaSlug
): ConteudoServicoPublico | null {
  if (slug in CONTEUDO_POR_SERVICO) {
    return CONTEUDO_POR_SERVICO[slug];
  }

  if (categoriaSlug) {
    return FALLBACK_POR_CATEGORIA[categoriaSlug];
  }

  return null;
}