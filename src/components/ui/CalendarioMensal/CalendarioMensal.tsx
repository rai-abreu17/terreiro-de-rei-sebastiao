import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as styles from './CalendarioMensal.css';

export interface CalendarioMensalProps {
  readonly dataSelecionada: string | null;
  readonly aoSelecionarData: (data: string) => void;
  readonly datasComDisponibilidade?: ReadonlySet<string>;
}

const ROTULOS_DIA_SEMANA = ['dom.', 'seg.', 'ter.', 'qua.', 'qui.', 'sex.', 'sáb.'] as const;

const NOMES_MES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
] as const;

function formatarISO(ano: number, mesZeroIdx: number, dia: number): string {
  return `${ano}-${String(mesZeroIdx + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
}

function obterHojeISO(): string {
  const h = new Date();
  return formatarISO(h.getFullYear(), h.getMonth(), h.getDate());
}

export function CalendarioMensal({
  dataSelecionada,
  aoSelecionarData,
  datasComDisponibilidade,
}: CalendarioMensalProps): React.ReactElement {
  const hojeISO = obterHojeISO();
  const hoje = new Date();

  const [anoMes, setAnoMes] = useState<{ ano: number; mes: number }>(() => {
    if (dataSelecionada) {
      const p = dataSelecionada.split('-');
      return { ano: Number(p[0]), mes: Number(p[1]) - 1 };
    }
    return { ano: hoje.getFullYear(), mes: hoje.getMonth() };
  });

  // Sincroniza mês exibido quando a data selecionada muda para outro mês (ex: "Próxima disponibilidade")
  useEffect(() => {
    if (!dataSelecionada) return;
    const p = dataSelecionada.split('-');
    const novoAno = Number(p[0]);
    const novoMes = Number(p[1]) - 1;
    setAnoMes((atual) =>
      atual.ano === novoAno && atual.mes === novoMes
        ? atual
        : { ano: novoAno, mes: novoMes }
    );
  }, [dataSelecionada]);

  const { ano, mes } = anoMes;
  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
  const totalDias = new Date(ano, mes + 1, 0).getDate();

  const podeRecuar =
    ano > hoje.getFullYear() ||
    (ano === hoje.getFullYear() && mes > hoje.getMonth());

  const avancarMes = () =>
    setAnoMes(({ ano: a, mes: m }) =>
      m === 11 ? { ano: a + 1, mes: 0 } : { ano: a, mes: m + 1 }
    );

  const recuarMes = () => {
    if (!podeRecuar) return;
    setAnoMes(({ ano: a, mes: m }) =>
      m === 0 ? { ano: a - 1, mes: 11 } : { ano: a, mes: m - 1 }
    );
  };

  const celulas: Array<number | null> = [
    ...Array<null>(primeiroDiaSemana).fill(null),
    ...Array.from({ length: totalDias }, (_, i) => i + 1),
  ];
  while (celulas.length % 7 !== 0) celulas.push(null);

  const semanas = Array.from({ length: celulas.length / 7 }, (_, s) =>
    celulas.slice(s * 7, s * 7 + 7)
  );

  return (
    <div className={styles.container}>
      <div className={styles.cabecalho}>
        <button
          type="button"
          className={styles.botaoNav}
          onClick={recuarMes}
          disabled={!podeRecuar}
          aria-label="Mês anterior"
        >
          <ChevronLeft size={14} />
        </button>
        <span className={styles.mesAno}>
          {NOMES_MES[mes]} {ano}
        </span>
        <button
          type="button"
          className={styles.botaoNav}
          onClick={avancarMes}
          aria-label="Próximo mês"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      <div
        className={styles.gradeCalendario}
        role="grid"
        aria-label={`Calendário de ${NOMES_MES[mes]} ${ano}`}
      >
        <div className={styles.linhaCabecalho} role="row">
          {ROTULOS_DIA_SEMANA.map((r) => (
            <div key={r} className={styles.rotuloDia} role="columnheader" aria-label={r}>
              {r}
            </div>
          ))}
        </div>

        {semanas.map((semana, idxSemana) => (
          <div key={idxSemana} className={styles.linhaSemana} role="row">
            {semana.map((dia, idxDia) => {
              if (dia === null) {
                return (
                  <div
                    key={`v-${idxSemana}-${idxDia}`}
                    role="gridcell"
                    aria-hidden="true"
                    className={styles.celulaVazia}
                  />
                );
              }

              const dataISO = formatarISO(ano, mes, dia);
              const isSelecionado = dataISO === dataSelecionada;
              const isHoje = dataISO === hojeISO;
              const isPast = dataISO < hojeISO;
              const temDot =
                !isSelecionado &&
                !isPast &&
                (datasComDisponibilidade?.has(dataISO) ?? false);

              let variante: keyof typeof styles.celulaDia = 'padrao';
              if (isPast) variante = 'desabilitado';
              else if (isSelecionado) variante = 'selecionado';
              else if (isHoje) variante = 'hoje';

              return (
                <div key={dataISO} role="gridcell">
                  <button
                    type="button"
                    className={styles.celulaDia[variante]}
                    disabled={isPast}
                    aria-pressed={isSelecionado}
                    aria-label={`${dia} de ${NOMES_MES[mes]}`}
                    aria-current={isHoje ? 'date' : undefined}
                    onClick={() => aoSelecionarData(dataISO)}
                  >
                    {dia}
                    {temDot && <span className={styles.ponto} aria-hidden="true" />}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
