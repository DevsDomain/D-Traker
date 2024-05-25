import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { AlteracaoProps } from '../../types/alteracao';

const xLabels = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
];

interface ApontamentoProps {
  alteracoes: AlteracaoProps;
}

export default function GraficoDeApontamentos({ alteracoes }: ApontamentoProps) {
  const [monthsAtuacao, setMonthsAtuacao] = useState({
    jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0,
    jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0
  });

  const [monthsRetrabalho, setMonthsRetrabalho] = useState({
    jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0,
    jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0
  });

  useEffect(() => {
    const updatedMonthsAtuacao = { ...monthsAtuacao };
    const updatedMonthsRetrabalho = { ...monthsRetrabalho };

    alteracoes.forEach((alteracao) => {
      const dateAtuacao = new Date(alteracao.data_entregue_atuacao);
      const monthAtuacao = dateAtuacao.getMonth();

      // Alimenta os meses de atuação 
      switch (monthAtuacao) {
        case 0: updatedMonthsAtuacao.jan += 1; break;
        case 1: updatedMonthsAtuacao.fev += 1; break;
        case 2: updatedMonthsAtuacao.mar += 1; break;
        case 3: updatedMonthsAtuacao.abr += 1; break;
        case 4: updatedMonthsAtuacao.mai += 1; break;
        case 5: updatedMonthsAtuacao.jun += 1; break;
        case 6: updatedMonthsAtuacao.jul += 1; break;
        case 7: updatedMonthsAtuacao.ago += 1; break;
        case 8: updatedMonthsAtuacao.set += 1; break;
        case 9: updatedMonthsAtuacao.out += 1; break;
        case 10: updatedMonthsAtuacao.nov += 1; break;
        case 11: updatedMonthsAtuacao.dez += 1; break;
        default: break;
      }

      // Caso exista um retrabalho vinculado , o valor é contabilizado nos meses de retrabalho
      if (alteracao.data_ordem_retrabalho) {
        const dateRetrabalho = new Date(alteracao.data_ordem_retrabalho);
        const monthRetrabalho = dateRetrabalho.getMonth();

        switch (monthRetrabalho) {
          case 0: updatedMonthsRetrabalho.jan += 1; break;
          case 1: updatedMonthsRetrabalho.fev += 1; break;
          case 2: updatedMonthsRetrabalho.mar += 1; break;
          case 3: updatedMonthsRetrabalho.abr += 1; break;
          case 4: updatedMonthsRetrabalho.mai += 1; break;
          case 5: updatedMonthsRetrabalho.jun += 1; break;
          case 6: updatedMonthsRetrabalho.jul += 1; break;
          case 7: updatedMonthsRetrabalho.ago += 1; break;
          case 8: updatedMonthsRetrabalho.set += 1; break;
          case 9: updatedMonthsRetrabalho.out += 1; break;
          case 10: updatedMonthsRetrabalho.nov += 1; break;
          case 11: updatedMonthsRetrabalho.dez += 1; break;
          default: break;
        }
      }
    });

    setMonthsAtuacao(updatedMonthsAtuacao);
    setMonthsRetrabalho(updatedMonthsRetrabalho);
  }, [alteracoes]);

  const dataAtuacao = [
    monthsAtuacao.jan, monthsAtuacao.fev, monthsAtuacao.mar, monthsAtuacao.abr, monthsAtuacao.mai, monthsAtuacao.jun,
    monthsAtuacao.jul, monthsAtuacao.ago, monthsAtuacao.set, monthsAtuacao.out, monthsAtuacao.nov, monthsAtuacao.dez
  ];

  const dataRetrabalho = [
    monthsRetrabalho.jan, monthsRetrabalho.fev, monthsRetrabalho.mar, monthsRetrabalho.abr, monthsRetrabalho.mai, monthsRetrabalho.jun,
    monthsRetrabalho.jul, monthsRetrabalho.ago, monthsRetrabalho.set, monthsRetrabalho.out, monthsRetrabalho.nov, monthsRetrabalho.dez
  ];

  return (
    <LineChart
      width={1000}
      height={300}
      series={[
        { data: dataAtuacao, label: 'Atuação', color: '#76b7b2' },
        { data: dataRetrabalho, label: 'Retrabalho', color: '#e15759' },
      ]}
      xAxis={[{ scaleType: 'band', data: xLabels }]}
    />
  );
}
