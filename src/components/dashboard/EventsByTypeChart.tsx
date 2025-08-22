import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useData } from '../../contexts/DataContext';
import { eventTypes } from '../../utils/mockData';

const EventsByTypeChart: React.FC = () => {
  const { events } = useData();

  const eventTypeData = Object.entries(eventTypes).map(([key, label]) => ({
    name: label,
    value: events.filter(event => event.type === key).length,
  })).filter(item => item.value > 0);

  const colors = [
    '#4f46e5', '#7c3aed', '#db2777', '#f59e0b', '#10b981', 
    '#06b6d4', '#ef4444', '#84cc16', '#f97316', '#6b7280'
  ];

  const option = {
    title: {
      text: 'Eventos por Tipo',
      subtext: 'Distribuição percentual dos eventos cadastrados',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937'
      },
      subtextStyle: {
        fontSize: 14,
        color: '#6b7280'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/><strong>{b}</strong>: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'center',
      textStyle: {
        fontSize: 12,
        color: '#4b5563'
      },
      icon: 'circle',
      itemGap: 12,
    },
    series: [
      {
        name: 'Tipo de Evento',
        type: 'pie',
        radius: ['50%', '75%'],
        center: ['65%', '55%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
            formatter: '{b}\n{c}'
          }
        },
        labelLine: {
          show: false
        },
        data: eventTypeData,
        color: colors,
      }
    ]
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full flex flex-col justify-center">
      {eventTypeData.length > 0 ? (
        <ReactECharts
          option={option}
          style={{ height: '350px', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
      ) : (
        <div className="text-center text-gray-500">
          <h3 className="text-lg font-semibold">Sem dados de eventos</h3>
          <p className="text-sm mt-1">Nenhum evento foi cadastrado para exibir no gráfico.</p>
        </div>
      )}
    </div>
  );
};

export default EventsByTypeChart;
