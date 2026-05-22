import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import * as styles from './DisponibilidadePage.css';
import { useAvailability, extractAvailabilityError } from '@/hooks/useAvailability';
import type { SaveAvailabilityOverrideRequest, AvailabilityOverride } from '@/api/availability-admin';

type Modalidade = 'IN_PERSON' | 'ONLINE';
type TipoDia = 'atendimento' | 'fechado';
type CategoriaServico = 'CONSULTATION' | 'RITUAL';

type JanelaHorario = {
  id: string;
  inicio: string;
  termino: string;
  modalidades: Modalidade[];
  categorias: CategoriaServico[];
};

type ConfiguracaoDia = {
  tipo: TipoDia;
  janelas: JanelaHorario[];
  observacao: string;
  motivo: string;
  repetirAtivo: boolean;
  aplicarAte: string;
};

type NovaJanela = {
  inicio: string;
  termino: string;
  modalidades: Modalidade[];
  categorias: CategoriaServico[];
};

type SemanaPadrao = {
  diasSelecionados: number[];
  inicio: string;
  termino: string;
  modalidades: Modalidade[];
  categorias: CategoriaServico[];
  preservarConfigurados: boolean;
};

const DIAS_DA_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const MODALIDADES: Array<{ valor: Modalidade; rotulo: string; icone: string }> = [
  { valor: 'IN_PERSON', rotulo: 'Presencial', icone: '🏠' },
  { valor: 'ONLINE', rotulo: 'Online', icone: '💻' },
];

const CATEGORIAS_SERVICO: Array<{ valor: CategoriaServico; rotulo: string; sigla: string }> = [
  { valor: 'CONSULTATION', rotulo: 'Consultas', sigla: 'C' },
  { valor: 'RITUAL', rotulo: 'Rituais', sigla: 'R' },
];

const MES_INICIAL = new Date(2026, 4, 1);

const SEMANA_PADRAO_INICIAL: SemanaPadrao = {
  diasSelecionados: [1, 2, 3, 4, 5],
  inicio: '09:00',
  termino: '17:00',
  modalidades: ['ONLINE'],
  categorias: ['CONSULTATION', 'RITUAL'],
  preservarConfigurados: true,
};

function combinarClasses(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

function doisDigitos(valor: number): string {
  return String(valor).padStart(2, '0');
}

function chaveDaData(data: Date): string {
  return `${data.getFullYear()}-${doisDigitos(data.getMonth() + 1)}-${doisDigitos(data.getDate())}`;
}

function dataDaChave(chave: string): Date {
  const [ano, mes, dia] = chave.split('-').map(Number);
  return new Date(ano, mes - 1, dia);
}

function inicioDoDia(data: Date): Date {
  return new Date(data.getFullYear(), data.getMonth(), data.getDate());
}

function adicionarDias(data: Date, dias: number): Date {
  return new Date(data.getFullYear(), data.getMonth(), data.getDate() + dias);
}

function adicionarMeses(data: Date, meses: number): Date {
  return new Date(data.getFullYear(), data.getMonth() + meses, 1);
}

function capitalizar(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function formatarMesAno(data: Date): string {
  const mes = data.toLocaleDateString('pt-BR', { month: 'long' });
  return `${capitalizar(mes)} ${data.getFullYear()}`;
}

function formatarDataExtensa(data: Date): string {
  return capitalizar(
    new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(data)
  );
}

function formatarDataToast(data: Date): string {
  return capitalizar(
    new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }).format(data)
  );
}

function formatarDataCurta(data: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  }).format(data);
}

function formatarMesInput(data: Date): string {
  return `${data.getFullYear()}-${doisDigitos(data.getMonth() + 1)}`;
}

function minutos(hora: string): number {
  const [horas, minutosHora] = hora.split(':').map(Number);
  return horas * 60 + minutosHora;
}

function janelasSobrepostas(a: Pick<JanelaHorario, 'inicio' | 'termino'>, b: Pick<JanelaHorario, 'inicio' | 'termino'>): boolean {
  return minutos(a.inicio) < minutos(b.termino) && minutos(b.inicio) < minutos(a.termino);
}

function criarConfiguracaoAtendimento(janelas: JanelaHorario[], observacao = ''): ConfiguracaoDia {
  return {
    tipo: 'atendimento',
    janelas,
    observacao,
    motivo: '',
    repetirAtivo: false,
    aplicarAte: '',
  };
}

function criarConfiguracaoFechado(motivo = ''): ConfiguracaoDia {
  return {
    tipo: 'fechado',
    janelas: [],
    observacao: '',
    motivo,
    repetirAtivo: false,
    aplicarAte: '',
  };
}

function criarJanela(
  id: string,
  inicio: string,
  termino: string,
  modalidades: Modalidade[],
  categorias: CategoriaServico[] = ['CONSULTATION', 'RITUAL']
): JanelaHorario {
  return { id, inicio, termino, modalidades, categorias };
}

function clonarConfiguracao(configuracao: ConfiguracaoDia): ConfiguracaoDia {
  return {
    ...configuracao,
    janelas: configuracao.janelas.map((janela) => ({
      ...janela,
      modalidades: [...janela.modalidades],
      categorias: [...janela.categorias],
    })),
  };
}

function criarRascunhoPadrao(dataSelecionada: Date): ConfiguracaoDia {
  return {
    tipo: 'atendimento',
    janelas: [],
    observacao: '',
    motivo: '',
    repetirAtivo: false,
    aplicarAte: formatarMesInput(adicionarMeses(dataSelecionada, 1)),
  };
}

function criarConfiguracoesExemplo(): Record<string, ConfiguracaoDia> {
  const configuracoes: Record<string, ConfiguracaoDia> = {};
  const inicioMaio = new Date(2026, 4, 1);
  const fimMaio = new Date(2026, 4, 31);

  for (let data = inicioMaio; data <= fimMaio; data = adicionarDias(data, 1)) {
    const diaSemana = data.getDay();

    if (diaSemana >= 1 && diaSemana <= 5) {
      configuracoes[chaveDaData(data)] = criarConfiguracaoAtendimento([
        criarJanela(`padrao-${chaveDaData(data)}`, '09:00', '17:00', ['IN_PERSON', 'ONLINE']),
      ]);
    }
  }

  configuracoes['2026-05-10'] = criarConfiguracaoAtendimento([
    criarJanela('sabado-10', '09:00', '12:00', ['ONLINE']),
  ]);
  configuracoes['2026-05-11'] = criarConfiguracaoFechado('Cerimônia interna');
  configuracoes['2026-05-14'] = criarConfiguracaoAtendimento(
    [criarJanela('quinta-14', '18:00', '21:00', ['ONLINE'])],
    'Plantão especial de teste'
  );

  return configuracoes;
}

function obterDiasDoMes(mesAtual: Date): Array<Date | null> {
  const ano = mesAtual.getFullYear();
  const mes = mesAtual.getMonth();
  const primeiroDia = new Date(ano, mes, 1);
  const totalDias = new Date(ano, mes + 1, 0).getDate();
  const celulas: Array<Date | null> = [];

  for (let indice = 0; indice < primeiroDia.getDay(); indice += 1) {
    celulas.push(null);
  }

  for (let dia = 1; dia <= totalDias; dia += 1) {
    celulas.push(new Date(ano, mes, dia));
  }

  while (celulas.length % 7 !== 0) {
    celulas.push(null);
  }

  return celulas;
}

function obterResumoDoMes(configuracoes: Record<string, ConfiguracaoDia>, mesAtual: Date): { configurados: number; fechados: number } {
  const prefixoMes = `${mesAtual.getFullYear()}-${doisDigitos(mesAtual.getMonth() + 1)}-`;
  const configuracoesDoMes = Object.entries(configuracoes).filter(([chave]) => chave.startsWith(prefixoMes));

  return {
    configurados: configuracoesDoMes.length,
    fechados: configuracoesDoMes.filter(([, configuracao]) => configuracao.tipo === 'fechado').length,
  };
}

function obterModalidadesUnicas(janelas: JanelaHorario[]): Modalidade[] {
  return MODALIDADES.map((modalidade) => modalidade.valor).filter((modalidade) =>
    janelas.some((janela) => janela.modalidades.includes(modalidade))
  );
}

function obterCategoriasUnicas(janelas: JanelaHorario[]): CategoriaServico[] {
  return CATEGORIAS_SERVICO.map((categoria) => categoria.valor).filter((categoria) =>
    janelas.some((janela) => janela.categorias.includes(categoria))
  );
}

function validarNovaJanela(novaJanela: NovaJanela, janelasExistentes: JanelaHorario[]): string | null {
  if (!novaJanela.inicio || !novaJanela.termino) {
    return 'Informe início e término.';
  }

  if (novaJanela.termino <= novaJanela.inicio) {
    return 'O término deve ser depois do início.';
  }

  if (novaJanela.modalidades.length === 0) {
    return 'Selecione ao menos uma modalidade.';
  }

  if (novaJanela.categorias.length === 0) {
    return 'Selecione ao menos uma categoria de serviço.';
  }

  const janelaConflitante = janelasExistentes.find((janela) => janelasSobrepostas(novaJanela, janela));

  if (janelaConflitante) {
    return `⚠️ Este horário conflita com ${janelaConflitante.inicio}–${janelaConflitante.termino}.`;
  }

  return null;
}

function calcularOcorrenciasRepeticao(chaveSelecionada: string | null, aplicarAte: string): Date[] {
  if (!chaveSelecionada || !aplicarAte) {
    return [];
  }

  const dataBase = dataDaChave(chaveSelecionada);
  const [anoLimite, mesLimite] = aplicarAte.split('-').map(Number);
  const fim = new Date(anoLimite, mesLimite, 0);
  const ocorrencias: Date[] = [];

  for (let data = adicionarDias(dataBase, 7); data <= fim; data = adicionarDias(data, 7)) {
    ocorrencias.push(data);
  }

  return ocorrencias;
}

function prepararConfiguracaoParaSalvar(rascunho: ConfiguracaoDia): ConfiguracaoDia {
  if (rascunho.tipo === 'fechado') {
    return criarConfiguracaoFechado(rascunho.motivo.trim());
  }

  return criarConfiguracaoAtendimento(
    rascunho.janelas.map((janela) => ({
      ...janela,
      modalidades: [...janela.modalidades],
      categorias: [...janela.categorias],
    })),
    rascunho.observacao.trim()
  );
}

function formatarModalidadesIcones(modalidades: Modalidade[]): string {
  return MODALIDADES.filter((modalidade) => modalidades.includes(modalidade.valor))
    .map((modalidade) => modalidade.icone)
    .join(' ');
}

function formatarCategoriasTexto(categorias: CategoriaServico[]): string {
  return CATEGORIAS_SERVICO.filter((categoria) => categorias.includes(categoria.valor))
    .map((categoria) => categoria.rotulo)
    .join(' + ');
}

function IconeCalendario(): React.ReactElement {
  return (
    <svg className={styles.emptyIcon} viewBox="0 0 48 48" aria-hidden="true">
      <rect x="8" y="10" width="32" height="30" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M15 6v8M33 6v8M8 18h32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 25h4M24 25h4M32 25h4M16 32h4M24 32h4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function formatarHoraComprimida(hora: string): string {
  const [h, m] = hora.split(':');
  return m === '00' ? h : hora;
}

function renderizarConteudoDiaMobile(configuracao?: ConfiguracaoDia): React.ReactElement {
  if (!configuracao) {
    return <span className={styles.mobileDayPlus}>+</span>;
  }

  if (configuracao.tipo === 'fechado') {
    return <span className={styles.mobileDayFechado}>Fechado</span>;
  }

  if (configuracao.janelas.length > 1) {
    return <span className={styles.mobileDayTime}>{configuracao.janelas.length} jan.</span>;
  }

  if (configuracao.janelas.length === 1) {
    const j = configuracao.janelas[0];
    const horario = `${formatarHoraComprimida(j.inicio)}–${formatarHoraComprimida(j.termino)}h`;
    const icones = MODALIDADES.filter((m) => j.modalidades.includes(m.valor))
      .map((m) => m.icone)
      .join('');
    return (
      <>
        <span className={styles.mobileDayTime}>{horario}</span>
        {icones && <span className={styles.mobileDayIcons}>{icones}</span>}
      </>
    );
  }

  return <span className={styles.mobileDayPlus}>+</span>;
}

export function DisponibilidadePage(): React.ReactElement {
  const [mesAtual, setMesAtual] = useState(MES_INICIAL);
  const [dataSelecionada, setDataSelecionada] = useState<string | null>(null);
  const [rascunho, setRascunho] = useState<ConfiguracaoDia | null>(null);
  const [novaJanela, setNovaJanela] = useState<NovaJanela | null>(null);
  const [janelaEmEdicaoId, setJanelaEmEdicaoId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [modalSemanaAberto, setModalSemanaAberto] = useState(false);
  const [semanaPadrao, setSemanaPadrao] = useState<SemanaPadrao>(SEMANA_PADRAO_INICIAL);
  const [painelMobileAberto, setPainelMobileAberto] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const mesFiltroFrom = useMemo(() => {
    const ano = mesAtual.getFullYear();
    const mes = mesAtual.getMonth();
    return `${ano}-${doisDigitos(mes + 1)}-01`;
  }, [mesAtual]);

  const mesFiltroTo = useMemo(() => {
    const fim = new Date(mesAtual.getFullYear(), mesAtual.getMonth() + 1, 0);
    return chaveDaData(fim);
  }, [mesAtual]);

  const {
    overrides,
    overridesQuery,
    createOverrideMutation,
    deleteOverridesByDateMutation,
    batchCreateOverridesMutation,
  } = useAvailability({
    overrides: { from: mesFiltroFrom, to: mesFiltroTo },
  });

  const configuracoes = useMemo(() => {
    const mapa: Record<string, ConfiguracaoDia> = {};

    for (const override of overrides) {
      const chave = override.date;
      const existente = mapa[chave];

      if (override.isClosed) {
        mapa[chave] = criarConfiguracaoFechado(override.reason ?? '');
        continue;
      }

      const janela = criarJanela(
        override.id,
        override.startTime ?? '09:00',
        override.endTime ?? '17:00',
        (override.modalities ?? []) as Modalidade[],
        (override.serviceTypes ?? []) as CategoriaServico[]
      );

      if (existente && existente.tipo === 'atendimento') {
        existente.janelas.push(janela);
        if (override.notes && !existente.observacao) {
          existente.observacao = override.notes;
        }
      } else {
        const config = criarConfiguracaoAtendimento([janela], override.notes ?? '');
        mapa[chave] = config;
      }
    }

    return mapa;
  }, [overrides]);

  const carregando = overridesQuery.isLoading;

  const hoje = useMemo(() => inicioDoDia(new Date()), []);
  const diasDoMes = useMemo(() => obterDiasDoMes(mesAtual), [mesAtual]);
  const resumo = useMemo(() => obterResumoDoMes(configuracoes, mesAtual), [configuracoes, mesAtual]);
  const dataSelecionadaObjeto = dataSelecionada ? dataDaChave(dataSelecionada) : null;
  const ocorrenciasRepeticao = useMemo(
    () => calcularOcorrenciasRepeticao(dataSelecionada, rascunho?.aplicarAte ?? ''),
    [dataSelecionada, rascunho?.aplicarAte]
  );
  const janelasParaValidacao = rascunho?.janelas.filter((janela) => janela.id !== janelaEmEdicaoId) ?? [];
  const erroNovaJanela = novaJanela ? validarNovaJanela(novaJanela, janelasParaValidacao) : null;
  const podeSalvarDia = Boolean(rascunho && !salvando && (rascunho.tipo === 'fechado' || rascunho.janelas.length > 0));
  const semanaPadraoInvalida =
    semanaPadrao.termino <= semanaPadrao.inicio ||
    semanaPadrao.modalidades.length === 0 ||
    semanaPadrao.categorias.length === 0 ||
    semanaPadrao.diasSelecionados.length === 0;
  const resumoConfigurados =
    resumo.configurados === 1 ? '1 dia configurado' : `${resumo.configurados} dias configurados`;
  const resumoFechados = resumo.fechados === 1 ? '1 dia fechado' : `${resumo.fechados} dias fechados`;

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const temporizador = window.setTimeout(() => setToast(null), 3000);
    return () => window.clearTimeout(temporizador);
  }, [toast]);

  // Android: mover rodapé fixo quando teclado virtual abre
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return undefined;

    const rodape = document.getElementById('mobile-panel-footer');
    const ajustar = () => {
      if (!rodape) return;
      const deslocamento = window.innerHeight - vv.height;
      rodape.style.transform = deslocamento > 0 ? `translateY(-${deslocamento}px)` : '';
    };

    vv.addEventListener('resize', ajustar);
    return () => vv.removeEventListener('resize', ajustar);
  }, []);

  const voltarParaCalendario = () => {
    setPainelMobileAberto(false);
  };

  const selecionarDia = (data: Date) => {
    if (inicioDoDia(data) < hoje) {
      return;
    }

    const chave = chaveDaData(data);
    const configuracaoExistente = configuracoes[chave];

    setDataSelecionada(chave);
    setNovaJanela(null);
    setJanelaEmEdicaoId(null);
    setRascunho(
      configuracaoExistente
        ? {
            ...clonarConfiguracao(configuracaoExistente),
            repetirAtivo: false,
            aplicarAte: formatarMesInput(adicionarMeses(data, 1)),
          }
        : criarRascunhoPadrao(data)
    );
    setPainelMobileAberto(true);
  };

  const navegarMes = (direcao: -1 | 1) => {
    setMesAtual((mes) => new Date(mes.getFullYear(), mes.getMonth() + direcao, 1));
    setDataSelecionada(null);
    setRascunho(null);
    setNovaJanela(null);
    setJanelaEmEdicaoId(null);
    setModalSemanaAberto(false);
    setPainelMobileAberto(false);
  };

  const alterarTipoDia = (tipo: TipoDia) => {
    setRascunho((estadoAtual) => {
      if (!estadoAtual || !dataSelecionadaObjeto) {
        return estadoAtual;
      }

      return {
        ...estadoAtual,
        tipo,
        aplicarAte: estadoAtual.aplicarAte || formatarMesInput(adicionarMeses(dataSelecionadaObjeto, 1)),
      };
    });
    setNovaJanela(null);
    setJanelaEmEdicaoId(null);
  };

  const removerJanela = (id: string) => {
    setRascunho((estadoAtual) =>
      estadoAtual
        ? {
            ...estadoAtual,
            janelas: estadoAtual.janelas.filter((janela) => janela.id !== id),
          }
        : estadoAtual
    );

    if (janelaEmEdicaoId === id) {
      setNovaJanela(null);
      setJanelaEmEdicaoId(null);
    }
  };

  const iniciarEdicaoJanela = (janela: JanelaHorario) => {
    setJanelaEmEdicaoId(janela.id);
    setNovaJanela({
      inicio: janela.inicio,
      termino: janela.termino,
      modalidades: [...janela.modalidades],
      categorias: [...janela.categorias],
    });
  };

  const confirmarNovaJanela = () => {
    if (!novaJanela || erroNovaJanela) {
      return;
    }

    setRascunho((estadoAtual) =>
      estadoAtual
        ? {
            ...estadoAtual,
            janelas: janelaEmEdicaoId
              ? estadoAtual.janelas.map((janela) =>
                  janela.id === janelaEmEdicaoId
                    ? criarJanela(
                        janela.id,
                        novaJanela.inicio,
                        novaJanela.termino,
                        [...novaJanela.modalidades],
                        [...novaJanela.categorias]
                      )
                    : janela
                )
              : [
                  ...estadoAtual.janelas,
                  criarJanela(
                    `janela-${Date.now()}`,
                    novaJanela.inicio,
                    novaJanela.termino,
                    [...novaJanela.modalidades],
                    [...novaJanela.categorias]
                  ),
                ],
          }
        : estadoAtual
    );
    setNovaJanela(null);
    setJanelaEmEdicaoId(null);
  };

  const alternarModalidadeNovaJanela = (modalidade: Modalidade) => {
    setNovaJanela((estadoAtual) => {
      if (!estadoAtual) {
        return estadoAtual;
      }

      const jaSelecionada = estadoAtual.modalidades.includes(modalidade);

      return {
        ...estadoAtual,
        modalidades: jaSelecionada
          ? estadoAtual.modalidades.filter((item) => item !== modalidade)
          : [...estadoAtual.modalidades, modalidade],
      };
    });
  };

  const alternarCategoriaNovaJanela = (categoria: CategoriaServico) => {
    setNovaJanela((estadoAtual) => {
      if (!estadoAtual) {
        return estadoAtual;
      }

      const jaSelecionada = estadoAtual.categorias.includes(categoria);

      return {
        ...estadoAtual,
        categorias: jaSelecionada
          ? estadoAtual.categorias.filter((item) => item !== categoria)
          : [...estadoAtual.categorias, categoria],
      };
    });
  };

  const alternarDiaSemanaPadrao = (dia: number) => {
    setSemanaPadrao((estadoAtual) => {
      const jaSelecionado = estadoAtual.diasSelecionados.includes(dia);

      return {
        ...estadoAtual,
        diasSelecionados: jaSelecionado
          ? estadoAtual.diasSelecionados.filter((item) => item !== dia)
          : [...estadoAtual.diasSelecionados, dia].sort((a, b) => a - b),
      };
    });
  };

  const alternarModalidadeSemanaPadrao = (modalidade: Modalidade) => {
    setSemanaPadrao((estadoAtual) => {
      const jaSelecionada = estadoAtual.modalidades.includes(modalidade);

      return {
        ...estadoAtual,
        modalidades: jaSelecionada
          ? estadoAtual.modalidades.filter((item) => item !== modalidade)
          : [...estadoAtual.modalidades, modalidade],
      };
    });
  };

  const alternarCategoriaSemanaPadrao = (categoria: CategoriaServico) => {
    setSemanaPadrao((estadoAtual) => {
      const jaSelecionada = estadoAtual.categorias.includes(categoria);

      return {
        ...estadoAtual,
        categorias: jaSelecionada
          ? estadoAtual.categorias.filter((item) => item !== categoria)
          : [...estadoAtual.categorias, categoria],
      };
    });
  };

  const limparDia = async () => {
    if (!dataSelecionada || !dataSelecionadaObjeto || salvando) {
      return;
    }

    setSalvando(true);
    try {
      await deleteOverridesByDateMutation.mutateAsync(dataSelecionada);
      setRascunho(criarRascunhoPadrao(dataSelecionadaObjeto));
      setNovaJanela(null);
      setJanelaEmEdicaoId(null);
      setToast(`✓ ${formatarDataToast(dataSelecionadaObjeto)} limpa.`);
    } catch (erro) {
      setToast(`✗ ${extractAvailabilityError(erro)}`);
    } finally {
      setSalvando(false);
    }
  };

  const salvarDia = async () => {
    if (!dataSelecionada || !rascunho || !dataSelecionadaObjeto || !podeSalvarDia) {
      return;
    }

    setSalvando(true);
    try {
      const configuracaoFinal = prepararConfiguracaoParaSalvar(rascunho);
      const datasParaSalvar = [dataSelecionada];

      if (rascunho.tipo === 'atendimento' && rascunho.repetirAtivo) {
        ocorrenciasRepeticao.forEach((data) => {
          datasParaSalvar.push(chaveDaData(data));
        });
      }

      const payloads: SaveAvailabilityOverrideRequest[] = [];
      
      for (const chaveData of datasParaSalvar) {
        if (configuracaoFinal.tipo === 'fechado') {
          payloads.push({
            date: chaveData,
            isClosed: true,
            startTime: null,
            endTime: null,
            modalities: null,
            serviceTypes: null,
            reason: configuracaoFinal.motivo.trim() || null,
            notes: null,
          });
        } else {
          configuracaoFinal.janelas.forEach((janela, indice) => {
            payloads.push({
              date: chaveData,
              isClosed: false,
              startTime: janela.inicio,
              endTime: janela.termino,
              modalities: janela.modalidades,
              serviceTypes: janela.categorias,
              reason: null,
              notes: indice === 0 ? (configuracaoFinal.observacao.trim() || null) : null,
            });
          });
        }
      }

      for (const chaveData of datasParaSalvar) {
        await deleteOverridesByDateMutation.mutateAsync(chaveData);
      }

      await batchCreateOverridesMutation.mutateAsync(payloads);

      setRascunho({
        ...clonarConfiguracao(configuracaoFinal),
        repetirAtivo: rascunho.repetirAtivo,
        aplicarAte: rascunho.aplicarAte,
      });
      setToast(`✓ ${formatarDataToast(dataSelecionadaObjeto)} configurada.`);
    } catch (erro) {
      setToast(`✗ ${extractAvailabilityError(erro)}`);
    } finally {
      setSalvando(false);
    }
  };

  const aplicarSemanaPadrao = async () => {
    if (semanaPadraoInvalida || salvando) {
      return;
    }

    setSalvando(true);
    try {
      const ano = mesAtual.getFullYear();
      const mes = mesAtual.getMonth();
      const totalDias = new Date(ano, mes + 1, 0).getDate();

      const payloads: SaveAvailabilityOverrideRequest[] = [];
      const datasParaDeletar: string[] = [];

      for (let dia = 1; dia <= totalDias; dia += 1) {
        const data = new Date(ano, mes, dia);
        const chave = chaveDaData(data);

        if (!semanaPadrao.diasSelecionados.includes(data.getDay())) {
          continue;
        }

        if (semanaPadrao.preservarConfigurados && configuracoes[chave]) {
          continue;
        }

        datasParaDeletar.push(chave);
        payloads.push({
          date: chave,
          isClosed: false,
          startTime: semanaPadrao.inicio,
          endTime: semanaPadrao.termino,
          modalities: semanaPadrao.modalidades,
          serviceTypes: semanaPadrao.categorias,
          reason: null,
          notes: null,
        });
      }

      for (const chaveData of datasParaDeletar) {
        await deleteOverridesByDateMutation.mutateAsync(chaveData);
      }
      
      if (payloads.length > 0) {
        await batchCreateOverridesMutation.mutateAsync(payloads);
      }

      setModalSemanaAberto(false);
      setToast(`✓ Semana padrão aplicada a ${formatarMesAno(mesAtual)}.`);
    } catch (erro) {
      setToast(`✗ ${extractAvailabilityError(erro)}`);
    } finally {
      setSalvando(false);
    }
  };

  const renderizarConteudoDia = (configuracao?: ConfiguracaoDia) => {
    if (!configuracao) {
      return <span className={styles.configureLabel}>+ configurar</span>;
    }

    if (configuracao.tipo === 'fechado') {
      return <span className={styles.closedLabel}>Fechado</span>;
    }

    const janelasVisiveis = configuracao.janelas.slice(0, 2);
    const janelasRestantes = configuracao.janelas.length - janelasVisiveis.length;
    const modalidades = obterModalidadesUnicas(configuracao.janelas);
    const categorias = obterCategoriasUnicas(configuracao.janelas);

    return (
      <>
        <div className={styles.dayWindows}>
          {janelasVisiveis.map((janela) => (
            <span key={janela.id} className={styles.windowPill}>
              {janela.inicio}–{janela.termino}
            </span>
          ))}
          {janelasRestantes > 0 && <span className={styles.morePill}>+{janelasRestantes} mais</span>}
        </div>
        <div className={styles.dayCategories}>
          {categorias.map((categoria) => {
            const dadosCategoria = CATEGORIAS_SERVICO.find((item) => item.valor === categoria);
            return (
              <span key={categoria} className={styles.categoryPill}>
                {dadosCategoria?.sigla}
              </span>
            );
          })}
        </div>
        <span className={styles.modalityIcons} aria-label="Modalidades do dia">
          {formatarModalidadesIcones(modalidades)}
        </span>
      </>
    );
  };

  return (
    <section className={styles.container} aria-labelledby="agenda-heading">
      <header className={styles.header}>
        <div className={styles.headerCopy}>
          <span className={styles.eyebrow}>Sprint 3 · Configuração da agenda</span>
          <h1 id="agenda-heading" className={styles.titulo}>
            Configuração de Agenda
          </h1>
          <p className={styles.descricao}>
            Veja o mês, escolha um dia e defina com clareza os horários de atendimento da Casa.
          </p>
        </div>
        <p className={styles.monthSummary} aria-live="polite">
          {formatarMesAno(mesAtual)} · {resumoConfigurados} · {resumoFechados}
        </p>
      </header>

      {/* ─── MOBILE CALENDAR (≤767px) ─── */}
      <div className={styles.mobileCal}>
        <div className={styles.mobileCalHeader}>
          <button
            type="button"
            className={combinarClasses(styles.mobileNavBtn, styles.tapReset)}
            onClick={() => navegarMes(-1)}
            aria-label="Mês anterior"
          >
            ←
          </button>
          <span className={styles.mobileMonthLabel}>{formatarMesAno(mesAtual)}</span>
          <button
            type="button"
            className={combinarClasses(styles.mobileNavBtn, styles.tapReset)}
            onClick={() => navegarMes(1)}
            aria-label="Próximo mês"
          >
            →
          </button>
        </div>

        <div className={styles.mobileSummaryBar}>
          <span className={styles.mobileSummaryChip} aria-live="polite">
            {resumoConfigurados} · {resumoFechados}
          </span>
        </div>

        <div className={styles.mobileBatchBar}>
          <button
            type="button"
            className={styles.mobileBatchBtn}
            onClick={() => setModalSemanaAberto((aberto) => !aberto)}
          >
            ⚡ Semana padrão
          </button>

          {modalSemanaAberto && (
            <div className={styles.inlineModal} role="region" aria-label="Definir semana padrão">
              <div className={styles.inlineModalHeader}>
                <h3 className={styles.modalTitle}>Definir semana padrão</h3>
                <button type="button" className={styles.closeButton} onClick={() => setModalSemanaAberto(false)} aria-label="Fechar">
                  ×
                </button>
              </div>

              <div className={styles.weekToggleGrid}>
                {[1, 2, 3, 4, 5, 6, 0].map((dia) => {
                  const ativo = semanaPadrao.diasSelecionados.includes(dia);
                  return (
                    <button
                      key={dia}
                      type="button"
                      className={combinarClasses(styles.weekToggle, styles.weekToggleMobile, ativo && styles.weekToggleActive)}
                      onClick={() => alternarDiaSemanaPadrao(dia)}
                      aria-pressed={ativo}
                    >
                      {DIAS_DA_SEMANA[dia]} {ativo ? '✓' : ''}
                    </button>
                  );
                })}
              </div>

              <div className={styles.compactTimeRow}>
                <label className={styles.fieldGroup}>
                  <span className={styles.label}>Início</span>
                  <input
                    type="time"
                    className={combinarClasses(styles.input, styles.inputMobileSafe)}
                    value={semanaPadrao.inicio}
                    onChange={(e) => setSemanaPadrao((s) => ({ ...s, inicio: e.target.value }))}
                  />
                </label>
                <span className={styles.untilText}>até</span>
                <label className={styles.fieldGroup}>
                  <span className={styles.label}>Término</span>
                  <input
                    type="time"
                    className={combinarClasses(styles.input, styles.inputMobileSafe)}
                    value={semanaPadrao.termino}
                    onChange={(e) => setSemanaPadrao((s) => ({ ...s, termino: e.target.value }))}
                  />
                </label>
              </div>

              <fieldset className={styles.fieldset}>
                <legend className={styles.label}>Modalidades</legend>
                <div className={styles.checkboxRow}>
                  {MODALIDADES.map((modalidade) => (
                    <label key={modalidade.valor} className={combinarClasses(styles.checkboxLabel, styles.checkboxLabelMobile)}>
                      <input
                        type="checkbox"
                        className={styles.checkboxInput}
                        checked={semanaPadrao.modalidades.includes(modalidade.valor)}
                        onChange={() => alternarModalidadeSemanaPadrao(modalidade.valor)}
                      />
                      <span>{modalidade.icone} {modalidade.rotulo}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className={styles.fieldset}>
                <legend className={styles.label}>Categorias</legend>
                <div className={styles.checkboxRow}>
                  {CATEGORIAS_SERVICO.map((categoria) => (
                    <label key={categoria.valor} className={combinarClasses(styles.checkboxLabel, styles.checkboxLabelMobile)}>
                      <input
                        type="checkbox"
                        className={styles.checkboxInput}
                        checked={semanaPadrao.categorias.includes(categoria.valor)}
                        onChange={() => alternarCategoriaSemanaPadrao(categoria.valor)}
                      />
                      <span>{categoria.rotulo}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className={combinarClasses(styles.checkboxLabel, styles.checkboxLabelMobile)}>
                <input
                  type="checkbox"
                  className={styles.checkboxInput}
                  checked={semanaPadrao.preservarConfigurados}
                  onChange={(e) => setSemanaPadrao((s) => ({ ...s, preservarConfigurados: e.target.checked }))}
                />
                <span>Não sobrescrever dias já configurados</span>
              </label>

              {semanaPadraoInvalida && <p className={styles.inlineError}>Selecione dias, modalidades, categorias e horário válido.</p>}

              <div className={styles.modalActions}>
                <button type="button" className={styles.secondaryButton} onClick={() => setModalSemanaAberto(false)}>Cancelar</button>
                <button type="button" className={styles.primaryButton} onClick={aplicarSemanaPadrao} disabled={semanaPadraoInvalida}>
                  Aplicar ao mês
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.calendarGrid} role="grid" aria-label={`Calendário de ${formatarMesAno(mesAtual)}`}>
          {DIAS_DA_SEMANA.map((dia) => (
            <div key={dia} className={styles.weekdayHeader} role="columnheader">{dia}</div>
          ))}

          {diasDoMes.map((data, indice) => {
            if (!data) {
              return <div key={`mvazio-${indice}`} className={combinarClasses(styles.blankDay, styles.blankDayMobileSize)} aria-hidden="true" />;
            }

            const chave = chaveDaData(data);
            const configuracao = configuracoes[chave];
            const passado = inicioDoDia(data) < hoje;
            const hojeVisivel = chave === chaveDaData(hoje);
            const selecionado = chave === dataSelecionada;

            return (
              <button
                key={`m-${chave}`}
                type="button"
                className={combinarClasses(
                  styles.dayCell,
                  styles.dayCellMobileSize,
                  styles.tapReset,
                  configuracao?.tipo === 'atendimento' && styles.dayConfigured,
                  configuracao?.tipo === 'fechado' && styles.dayClosed,
                  passado && styles.dayPast,
                  selecionado && styles.daySelected
                )}
                onClick={() => selecionarDia(data)}
                disabled={passado}
                aria-pressed={selecionado}
                aria-label={`${formatarDataExtensa(data)}${configuracao ? (configuracao.tipo === 'fechado' ? ', fechado' : ', configurado') : ', sem configuração'}`}
              >
                <span
                  className={combinarClasses(
                    styles.dayNumber,
                    configuracao?.tipo === 'atendimento' && styles.dayNumberConfigured,
                    configuracao?.tipo === 'fechado' && styles.dayNumberClosed,
                    hojeVisivel && styles.todayNumber,
                    selecionado && styles.dayNumberSelected
                  )}
                >
                  {data.getDate()}
                </span>
                <span className={styles.cellMobile}>
                  {renderizarConteudoDiaMobile(configuracao)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── MOBILE PANEL OVERLAY (≤767px, slides from right) ─── */}
      <div
        className={combinarClasses(
          styles.mobilePanelOverlay,
          painelMobileAberto && styles.mobilePanelOverlayOpen
        )}
        aria-modal="true"
        aria-label={dataSelecionadaObjeto ? `Configuração de ${formatarDataExtensa(dataSelecionadaObjeto)}` : 'Painel do dia'}
        role="dialog"
      >
        <div className={styles.mobilePanelHeader}>
          <button
            type="button"
            className={styles.mobileBackBtn}
            onClick={voltarParaCalendario}
            aria-label="Voltar ao calendário"
          >
            ← Voltar
          </button>
          <span className={styles.mobilePanelTitle}>
            {dataSelecionadaObjeto
              ? new Intl.DateTimeFormat('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' }).format(dataSelecionadaObjeto)
              : ''}
          </span>
          <span />
        </div>

        <div className={styles.mobilePanelBody}>
          {!dataSelecionadaObjeto || !rascunho ? (
            <div className={styles.emptyPanel}>
              <IconeCalendario />
              <p>Selecione um dia no calendário para configurar.</p>
            </div>
          ) : (
            <>
              <section className={styles.panelSection} aria-labelledby="m-tipo-dia-heading">
                <h3 id="m-tipo-dia-heading" className={styles.panelSectionTitle}>Tipo do dia</h3>
                <div className={styles.dayTypeGrid}>
                  <button
                    type="button"
                    className={combinarClasses(
                      styles.dayTypeCard,
                      styles.dayTypeCardMobile,
                      rascunho.tipo === 'atendimento' ? styles.dayTypeCardSelected : styles.dayTypeCardMuted
                    )}
                    onClick={() => alterarTipoDia('atendimento')}
                    aria-pressed={rascunho.tipo === 'atendimento'}
                  >
                    <strong className={styles.dayTypeTitle}>📅 Atendimento</strong>
                    <span className={styles.dayTypeSubtitle}>Com horários</span>
                  </button>
                  <button
                    type="button"
                    className={combinarClasses(
                      styles.dayTypeCard,
                      styles.dayTypeCardMobile,
                      rascunho.tipo === 'fechado' ? styles.dayTypeCardSelected : styles.dayTypeCardMuted
                    )}
                    onClick={() => alterarTipoDia('fechado')}
                    aria-pressed={rascunho.tipo === 'fechado'}
                  >
                    <strong className={styles.dayTypeTitle}>🔒 Fechado</strong>
                    <span className={styles.dayTypeSubtitle}>Sem atendimentos</span>
                  </button>
                </div>
              </section>

              {rascunho.tipo === 'atendimento' ? (
                <>
                  <section className={styles.panelSection} aria-labelledby="m-janelas-heading">
                    <div className={styles.panelSectionHeader}>
                      <h3 id="m-janelas-heading" className={styles.panelSectionTitle}>Janelas de horário</h3>
                      <button
                        type="button"
                        className={styles.outlineButton}
                        onClick={() => {
                          setJanelaEmEdicaoId(null);
                          setNovaJanela({ inicio: '09:00', termino: '17:00', modalidades: [], categorias: [] });
                        }}
                      >
                        + Adicionar janela
                      </button>
                    </div>

                    {rascunho.janelas.length === 0 ? (
                      <p className={styles.miniEmpty}>Nenhuma janela adicionada.</p>
                    ) : (
                      <div className={styles.windowList}>
                        {rascunho.janelas.map((janela) => (
                          <div key={janela.id} className={styles.windowRow}>
                            <span className={styles.timeChip}>{janela.inicio}</span>
                            <span className={styles.untilText}>–</span>
                            <span className={styles.timeChip}>{janela.termino}</span>
                            <span className={styles.windowIcons}>{formatarModalidadesIcones(janela.modalidades)}</span>
                            <span className={styles.windowCategories}>{formatarCategoriasTexto(janela.categorias)}</span>
                            <div className={styles.windowActions}>
                              <button
                                type="button"
                                className={styles.smallIconButton}
                                onClick={() => iniciarEdicaoJanela(janela)}
                                aria-label={`Editar janela ${janela.inicio}–${janela.termino}`}
                              >
                                <Pencil size={16} aria-hidden="true" />
                              </button>
                              <button
                                type="button"
                                className={styles.smallIconDangerButton}
                                onClick={() => removerJanela(janela.id)}
                                aria-label={`Remover janela ${janela.inicio}–${janela.termino}`}
                              >
                                <Trash2 size={16} aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {novaJanela && (
                      <div className={styles.editWindowRow}>
                        <div className={styles.compactTimeRow}>
                          <label className={styles.fieldGroup}>
                            <span className={styles.label}>Início</span>
                            <input
                              type="time"
                              className={combinarClasses(styles.input, styles.inputMobileSafe)}
                              value={novaJanela.inicio}
                              onChange={(e) => setNovaJanela((s) => s ? { ...s, inicio: e.target.value } : s)}
                            />
                          </label>
                          <label className={styles.fieldGroup}>
                            <span className={styles.label}>Término</span>
                            <input
                              type="time"
                              className={combinarClasses(styles.input, styles.inputMobileSafe)}
                              value={novaJanela.termino}
                              onChange={(e) => setNovaJanela((s) => s ? { ...s, termino: e.target.value } : s)}
                            />
                          </label>
                        </div>

                        <fieldset className={styles.fieldset}>
                          <legend className={styles.label}>Modalidades</legend>
                          <div className={styles.checkboxRow}>
                            {MODALIDADES.map((modalidade) => (
                              <label key={modalidade.valor} className={combinarClasses(styles.checkboxLabel, styles.checkboxLabelMobile)}>
                                <input
                                  type="checkbox"
                                  className={styles.checkboxInput}
                                  checked={novaJanela.modalidades.includes(modalidade.valor)}
                                  onChange={() => alternarModalidadeNovaJanela(modalidade.valor)}
                                />
                                <span>{modalidade.icone} {modalidade.rotulo}</span>
                              </label>
                            ))}
                          </div>
                        </fieldset>

                        <fieldset className={styles.fieldset}>
                          <legend className={styles.label}>Categorias</legend>
                          <div className={styles.checkboxRow}>
                            {CATEGORIAS_SERVICO.map((categoria) => (
                              <label key={categoria.valor} className={combinarClasses(styles.checkboxLabel, styles.checkboxLabelMobile)}>
                                <input
                                  type="checkbox"
                                  className={styles.checkboxInput}
                                  checked={novaJanela.categorias.includes(categoria.valor)}
                                  onChange={() => alternarCategoriaNovaJanela(categoria.valor)}
                                />
                                <span>{categoria.rotulo}</span>
                              </label>
                            ))}
                          </div>
                        </fieldset>

                        {erroNovaJanela && <p className={styles.inlineError}>{erroNovaJanela}</p>}

                        <div className={styles.inlineActions}>
                          <button
                            type="button"
                            className={styles.primaryButton}
                            onClick={confirmarNovaJanela}
                            disabled={Boolean(erroNovaJanela)}
                          >
                            {janelaEmEdicaoId ? 'Salvar' : 'Confirmar'}
                          </button>
                          <button
                            type="button"
                            className={styles.secondaryButton}
                            onClick={() => { setNovaJanela(null); setJanelaEmEdicaoId(null); }}
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    )}

                    {rascunho.janelas.length === 0 && (
                      <p className={styles.inlineHint}>Adicione ao menos uma janela para salvar como dia de atendimento.</p>
                    )}
                  </section>

                  <section className={styles.panelSection} aria-labelledby="m-repetir-heading">
                    <h3 id="m-repetir-heading" className={styles.panelSectionTitle}>Repetir este dia</h3>
                    <label className={combinarClasses(styles.checkboxLabel, styles.checkboxLabelMobile)}>
                      <input
                        type="checkbox"
                        className={styles.checkboxInput}
                        checked={rascunho.repetirAtivo}
                        role="switch"
                        aria-checked={rascunho.repetirAtivo}
                        onChange={(e) =>
                          setRascunho((s) => s ? { ...s, repetirAtivo: e.target.checked } : s)
                        }
                      />
                      <span>Repetir toda semana neste mesmo dia</span>
                    </label>

                    {rascunho.repetirAtivo && (
                      <div className={styles.repeatDetails}>
                        <label className={styles.fieldGroup}>
                          <span className={styles.label}>Aplicar até:</span>
                          <input
                            type="month"
                            className={combinarClasses(styles.input, styles.inputMobileSafe)}
                            value={rascunho.aplicarAte}
                            onChange={(e) =>
                              setRascunho((s) => s ? { ...s, aplicarAte: e.target.value } : s)
                            }
                          />
                        </label>
                        <p className={styles.previewText}>
                          Vai replicar para:{' '}
                          {ocorrenciasRepeticao.length > 0
                            ? `${ocorrenciasRepeticao.slice(0, 3).map((d) => formatarDataCurta(d)).join(', ')}${ocorrenciasRepeticao.length > 3 ? '...' : ''}`
                            : 'nenhuma data futura neste intervalo'}
                        </p>
                      </div>
                    )}
                  </section>

                  <section className={styles.panelSection} aria-labelledby="m-obs-heading">
                    <label id="m-obs-heading" className={styles.panelSectionTitle} htmlFor="m-observacao-interna">
                      Observação interna
                    </label>
                    <textarea
                      id="m-observacao-interna"
                      className={combinarClasses(styles.textArea, styles.inputMobileSafe)}
                      rows={3}
                      style={{ resize: 'none' }}
                      placeholder="Ex.: Retiro espiritual, atendimento especial..."
                      value={rascunho.observacao}
                      onChange={(e) => setRascunho((s) => s ? { ...s, observacao: e.target.value } : s)}
                    />
                  </section>
                </>
              ) : (
                <section className={styles.panelSection} aria-labelledby="m-motivo-heading">
                  <label id="m-motivo-heading" className={styles.panelSectionTitle} htmlFor="m-motivo-fechado">
                    Motivo (opcional)
                  </label>
                  <textarea
                    id="m-motivo-fechado"
                    className={combinarClasses(styles.textArea, styles.inputMobileSafe)}
                    rows={4}
                    style={{ resize: 'none' }}
                    placeholder="Ex.: Feriado, folga, retiro..."
                    value={rascunho.motivo}
                    onChange={(e) => setRascunho((s) => s ? { ...s, motivo: e.target.value } : s)}
                  />
                </section>
              )}
            </>
          )}
        </div>

        <div id="mobile-panel-footer" className={styles.mobilePanelFooter}>
          <button type="button" className={styles.secondaryButton} onClick={limparDia}>
            Limpar dia
          </button>
          <button type="button" className={styles.primaryButton} onClick={() => { salvarDia(); }} disabled={!podeSalvarDia}>
            Salvar
          </button>
        </div>
      </div>

      {/* ─── DESKTOP / TABLET GRID (≥768px) ─── */}
      <div className={combinarClasses(styles.agendaGrid, styles.agendaGridMobileHide, styles.agendaGridTablet)}>
        <section className={styles.calendarSection} aria-labelledby="calendario-heading">
          <div className={styles.calendarToolbar}>
            <div>
              <h2 id="calendario-heading" className={styles.sectionTitle}>
                Calendário mensal
              </h2>
              <p className={styles.sectionDescription}>Clique em qualquer dia atual ou futuro para configurar.</p>
            </div>

            <div className={styles.monthControls} aria-label="Navegação entre meses">
              <button type="button" className={styles.iconButton} onClick={() => navegarMes(-1)} aria-label="Mês anterior">
                ←
              </button>
              <span className={styles.currentMonth}>{formatarMesAno(mesAtual)}</span>
              <button type="button" className={styles.iconButton} onClick={() => navegarMes(1)} aria-label="Próximo mês">
                →
              </button>
            </div>
          </div>

          <div className={styles.batchArea}>
            <button type="button" className={styles.outlineButton} onClick={() => setModalSemanaAberto((aberto) => !aberto)}>
              ⚡ Aplicar semana padrão a todo o mês
            </button>

            {modalSemanaAberto && (
              <div className={styles.inlineModal} role="region" aria-label="Definir semana padrão">
                <div className={styles.inlineModalHeader}>
                  <h3 className={styles.modalTitle}>Definir semana padrão</h3>
                  <button type="button" className={styles.closeButton} onClick={() => setModalSemanaAberto(false)} aria-label="Fechar">
                    ×
                  </button>
                </div>

                <div className={styles.weekToggleGrid}>
                  {[1, 2, 3, 4, 5, 6, 0].map((dia) => {
                    const ativo = semanaPadrao.diasSelecionados.includes(dia);
                    return (
                      <button
                        key={dia}
                        type="button"
                        className={combinarClasses(styles.weekToggle, ativo && styles.weekToggleActive)}
                        onClick={() => alternarDiaSemanaPadrao(dia)}
                        aria-pressed={ativo}
                      >
                        {DIAS_DA_SEMANA[dia]} {ativo ? '✓' : ''}
                      </button>
                    );
                  })}
                </div>

                <div className={styles.compactTimeRow}>
                  <label className={styles.fieldGroup}>
                    <span className={styles.label}>Início</span>
                    <input
                      type="time"
                      className={styles.input}
                      value={semanaPadrao.inicio}
                      onChange={(evento) => setSemanaPadrao((estado) => ({ ...estado, inicio: evento.target.value }))}
                    />
                  </label>
                  <span className={styles.untilText}>até</span>
                  <label className={styles.fieldGroup}>
                    <span className={styles.label}>Término</span>
                    <input
                      type="time"
                      className={styles.input}
                      value={semanaPadrao.termino}
                      onChange={(evento) => setSemanaPadrao((estado) => ({ ...estado, termino: evento.target.value }))}
                    />
                  </label>
                </div>

                <fieldset className={styles.fieldset}>
                  <legend className={styles.label}>Modalidades</legend>
                  <div className={styles.checkboxRow}>
                    {MODALIDADES.map((modalidade) => (
                      <label key={modalidade.valor} className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          className={styles.checkboxInput}
                          checked={semanaPadrao.modalidades.includes(modalidade.valor)}
                          onChange={() => alternarModalidadeSemanaPadrao(modalidade.valor)}
                        />
                        <span>
                          {modalidade.icone} {modalidade.rotulo}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className={styles.fieldset}>
                  <legend className={styles.label}>Categorias de serviço</legend>
                  <div className={styles.checkboxRow}>
                    {CATEGORIAS_SERVICO.map((categoria) => (
                      <label key={categoria.valor} className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          className={styles.checkboxInput}
                          checked={semanaPadrao.categorias.includes(categoria.valor)}
                          onChange={() => alternarCategoriaSemanaPadrao(categoria.valor)}
                        />
                        <span>{categoria.rotulo}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkboxInput}
                    checked={semanaPadrao.preservarConfigurados}
                    onChange={(evento) =>
                      setSemanaPadrao((estado) => ({ ...estado, preservarConfigurados: evento.target.checked }))
                    }
                  />
                  <span>Não sobrescrever dias já configurados</span>
                </label>

                {semanaPadraoInvalida && <p className={styles.inlineError}>Selecione dias, modalidades, categorias e um horário válido.</p>}

                <div className={styles.modalActions}>
                  <button type="button" className={styles.secondaryButton} onClick={() => setModalSemanaAberto(false)}>
                    Cancelar
                  </button>
                  <button type="button" className={styles.primaryButton} onClick={aplicarSemanaPadrao} disabled={semanaPadraoInvalida}>
                    Aplicar ao mês inteiro
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className={styles.calendarGrid} role="grid" aria-label={`Calendário de ${formatarMesAno(mesAtual)}`}>
            {DIAS_DA_SEMANA.map((dia) => (
              <div key={dia} className={styles.weekdayHeader} role="columnheader">
                {dia}
              </div>
            ))}

            {diasDoMes.map((data, indice) => {
              if (!data) {
                return <div key={`vazio-${indice}`} className={styles.blankDay} aria-hidden="true" />;
              }

              const chave = chaveDaData(data);
              const configuracao = configuracoes[chave];
              const passado = inicioDoDia(data) < hoje;
              const hojeVisivel = chave === chaveDaData(hoje);
              const selecionado = chave === dataSelecionada;

              return (
                <button
                  key={chave}
                  type="button"
                  className={combinarClasses(
                    styles.dayCell,
                    configuracao?.tipo === 'atendimento' && styles.dayConfigured,
                    configuracao?.tipo === 'fechado' && styles.dayClosed,
                    passado && styles.dayPast,
                    selecionado && styles.daySelected
                  )}
                  onClick={() => selecionarDia(data)}
                  disabled={passado}
                  aria-pressed={selecionado}
                  aria-label={`${formatarDataExtensa(data)}${configuracao ? ', configurado' : ', sem configuração'}`}
                >
                  <span
                    className={combinarClasses(
                      styles.dayNumber,
                      configuracao?.tipo === 'atendimento' && styles.dayNumberConfigured,
                      configuracao?.tipo === 'fechado' && styles.dayNumberClosed,
                      hojeVisivel && styles.todayNumber,
                      selecionado && styles.dayNumberSelected
                    )}
                  >
                    {data.getDate()}
                  </span>
                  {renderizarConteudoDia(configuracao)}
                </button>
              );
            })}
          </div>
        </section>

        <aside className={styles.sidePanel} aria-live="polite">
          {!dataSelecionadaObjeto || !rascunho ? (
            <div className={styles.emptyPanel}>
              <IconeCalendario />
              <p>Selecione um dia no calendário para configurar.</p>
            </div>
          ) : (
            <>
              <div className={styles.panelContent}>
                <div className={styles.panelHeader}>
                  <span className={styles.panelEyebrow}>Dia selecionado</span>
                  <h2 className={styles.panelTitle}>{formatarDataExtensa(dataSelecionadaObjeto)}</h2>
                </div>

                <section className={styles.panelSection} aria-labelledby="tipo-dia-heading">
                  <h3 id="tipo-dia-heading" className={styles.panelSectionTitle}>
                    Tipo do dia
                  </h3>
                  <div className={styles.dayTypeGrid}>
                    <button
                      type="button"
                      className={combinarClasses(
                        styles.dayTypeCard,
                        rascunho.tipo === 'atendimento' ? styles.dayTypeCardSelected : styles.dayTypeCardMuted
                      )}
                      onClick={() => alterarTipoDia('atendimento')}
                      aria-pressed={rascunho.tipo === 'atendimento'}
                    >
                      <strong className={styles.dayTypeTitle}>📅 Dia de Atendimento</strong>
                      <span className={styles.dayTypeSubtitle}>Com horários disponíveis</span>
                    </button>
                    <button
                      type="button"
                      className={combinarClasses(
                        styles.dayTypeCard,
                        rascunho.tipo === 'fechado' ? styles.dayTypeCardSelected : styles.dayTypeCardMuted
                      )}
                      onClick={() => alterarTipoDia('fechado')}
                      aria-pressed={rascunho.tipo === 'fechado'}
                    >
                      <strong className={styles.dayTypeTitle}>🔒 Dia Fechado</strong>
                      <span className={styles.dayTypeSubtitle}>Sem atendimentos</span>
                    </button>
                  </div>
                </section>

                {rascunho.tipo === 'atendimento' ? (
                  <>
                    <section className={styles.panelSection} aria-labelledby="janelas-heading">
                      <div className={styles.panelSectionHeader}>
                        <h3 id="janelas-heading" className={styles.panelSectionTitle}>
                          Janelas de horário
                        </h3>
                        <button
                          type="button"
                          className={styles.outlineButton}
                          onClick={() => {
                            setJanelaEmEdicaoId(null);
                            setNovaJanela({ inicio: '09:00', termino: '17:00', modalidades: [], categorias: [] });
                          }}
                        >
                          + Adicionar janela de horário
                        </button>
                      </div>

                      {rascunho.janelas.length === 0 ? (
                        <p className={styles.miniEmpty}>Nenhuma janela adicionada para este dia.</p>
                      ) : (
                        <div className={styles.windowList}>
                          {rascunho.janelas.map((janela) => (
                            <div key={janela.id} className={styles.windowRow}>
                              <span className={styles.timeChip}>{janela.inicio}</span>
                              <span className={styles.untilText}>até</span>
                              <span className={styles.timeChip}>{janela.termino}</span>
                              <span className={styles.windowIcons}>{formatarModalidadesIcones(janela.modalidades)}</span>
                              <span className={styles.windowCategories}>{formatarCategoriasTexto(janela.categorias)}</span>
                              <div className={styles.windowActions}>
                                <button
                                  type="button"
                                  className={styles.smallIconButton}
                                  onClick={() => iniciarEdicaoJanela(janela)}
                                  aria-label={`Editar janela das ${janela.inicio} às ${janela.termino}`}
                                  title="Editar janela"
                                >
                                  <Pencil size={16} aria-hidden="true" />
                                </button>
                                <button
                                  type="button"
                                  className={styles.smallIconDangerButton}
                                  onClick={() => removerJanela(janela.id)}
                                  aria-label={`Remover janela das ${janela.inicio} às ${janela.termino}`}
                                  title="Remover janela"
                                >
                                  <Trash2 size={16} aria-hidden="true" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {novaJanela && (
                        <div className={styles.editWindowRow}>
                          <div className={styles.compactTimeRow}>
                            <label className={styles.fieldGroup}>
                              <span className={styles.label}>Início</span>
                              <input
                                type="time"
                                className={styles.input}
                                value={novaJanela.inicio}
                                onChange={(evento) => setNovaJanela((estado) => (estado ? { ...estado, inicio: evento.target.value } : estado))}
                              />
                            </label>
                            <label className={styles.fieldGroup}>
                              <span className={styles.label}>Término</span>
                              <input
                                type="time"
                                className={styles.input}
                                value={novaJanela.termino}
                                onChange={(evento) => setNovaJanela((estado) => (estado ? { ...estado, termino: evento.target.value } : estado))}
                              />
                            </label>
                          </div>

                          <fieldset className={styles.fieldset}>
                            <legend className={styles.label}>Modalidades</legend>
                            <div className={styles.checkboxRow}>
                              {MODALIDADES.map((modalidade) => (
                                <label key={modalidade.valor} className={styles.checkboxLabel}>
                                  <input
                                    type="checkbox"
                                    className={styles.checkboxInput}
                                    checked={novaJanela.modalidades.includes(modalidade.valor)}
                                    onChange={() => alternarModalidadeNovaJanela(modalidade.valor)}
                                  />
                                  <span>
                                    {modalidade.icone} {modalidade.rotulo}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </fieldset>

                          <fieldset className={styles.fieldset}>
                            <legend className={styles.label}>Categorias de serviço</legend>
                            <div className={styles.checkboxRow}>
                              {CATEGORIAS_SERVICO.map((categoria) => (
                                <label key={categoria.valor} className={styles.checkboxLabel}>
                                  <input
                                    type="checkbox"
                                    className={styles.checkboxInput}
                                    checked={novaJanela.categorias.includes(categoria.valor)}
                                    onChange={() => alternarCategoriaNovaJanela(categoria.valor)}
                                  />
                                  <span>{categoria.rotulo}</span>
                                </label>
                              ))}
                            </div>
                          </fieldset>

                          {erroNovaJanela && <p className={styles.inlineError}>{erroNovaJanela}</p>}

                          <div className={styles.inlineActions}>
                            <button type="button" className={styles.primaryButton} onClick={confirmarNovaJanela} disabled={Boolean(erroNovaJanela)}>
                              {janelaEmEdicaoId ? 'Salvar janela' : 'Confirmar'}
                            </button>
                            <button
                              type="button"
                              className={styles.secondaryButton}
                              onClick={() => {
                                setNovaJanela(null);
                                setJanelaEmEdicaoId(null);
                              }}
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      )}

                      {rascunho.janelas.length === 0 && <p className={styles.inlineHint}>Adicione ao menos uma janela para salvar como dia de atendimento.</p>}
                    </section>

                    <section className={styles.panelSection} aria-labelledby="repetir-heading">
                      <h3 id="repetir-heading" className={styles.panelSectionTitle}>
                        Repetir este dia
                      </h3>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          className={styles.checkboxInput}
                          checked={rascunho.repetirAtivo}
                          onChange={(evento) =>
                            setRascunho((estadoAtual) =>
                              estadoAtual ? { ...estadoAtual, repetirAtivo: evento.target.checked } : estadoAtual
                            )
                          }
                        />
                        <span>Repetir toda semana neste mesmo dia do mês</span>
                      </label>

                      {rascunho.repetirAtivo && (
                        <div className={styles.repeatDetails}>
                          <label className={styles.fieldGroup}>
                            <span className={styles.label}>Aplicar até:</span>
                            <input
                              type="month"
                              className={styles.input}
                              value={rascunho.aplicarAte}
                              onChange={(evento) =>
                                setRascunho((estadoAtual) =>
                                  estadoAtual ? { ...estadoAtual, aplicarAte: evento.target.value } : estadoAtual
                                )
                              }
                            />
                          </label>
                          <p className={styles.previewText}>
                            Vai replicar para:{' '}
                            {ocorrenciasRepeticao.length > 0
                              ? `${ocorrenciasRepeticao
                                  .slice(0, 3)
                                  .map((data) => formatarDataCurta(data))
                                  .join(', ')}${ocorrenciasRepeticao.length > 3 ? '...' : ''}`
                              : 'nenhuma data futura neste intervalo'}
                          </p>
                        </div>
                      )}
                    </section>

                    <section className={styles.panelSection} aria-labelledby="observacao-heading">
                      <label id="observacao-heading" className={styles.panelSectionTitle} htmlFor="observacao-interna">
                        Observação interna
                      </label>
                      <textarea
                        id="observacao-interna"
                        className={styles.textArea}
                        rows={3}
                        placeholder="Ex.: Retiro espiritual, atendimento especial..."
                        value={rascunho.observacao}
                        onChange={(evento) => setRascunho((estadoAtual) => (estadoAtual ? { ...estadoAtual, observacao: evento.target.value } : estadoAtual))}
                      />
                    </section>
                  </>
                ) : (
                  <section className={styles.panelSection} aria-labelledby="motivo-heading">
                    <label id="motivo-heading" className={styles.panelSectionTitle} htmlFor="motivo-fechado">
                      Motivo (opcional)
                    </label>
                    <textarea
                      id="motivo-fechado"
                      className={styles.textArea}
                      rows={4}
                      placeholder="Ex.: Feriado, folga, retiro..."
                      value={rascunho.motivo}
                      onChange={(evento) => setRascunho((estadoAtual) => (estadoAtual ? { ...estadoAtual, motivo: evento.target.value } : estadoAtual))}
                    />
                  </section>
                )}
              </div>

              <footer className={styles.panelFooter}>
                <button type="button" className={styles.secondaryButton} onClick={limparDia}>
                  Limpar dia
                </button>
                <button type="button" className={styles.primaryButton} onClick={salvarDia} disabled={!podeSalvarDia}>
                  Salvar configuração
                </button>
              </footer>
            </>
          )}
        </aside>
      </div>

      {toast && (
        <div className={styles.toast} role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </section>
  );
}
