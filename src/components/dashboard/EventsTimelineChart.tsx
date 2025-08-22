import React from 'react';
import ReactECharts from 'echarts-for-react';
import { mockEvents } from '../../utils/mockData';
import { format, startOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const EventsTimelineChart: React.FC = () => {
  const currentDate = new Date();
  const startDate = subMonths(currentDate, 6);
  const months = eachMonthOfInterval({ start: startDate, end: currentDate });

  const monthlyData = months.map(month => {
    const monthStart = startOfMonth(month);
    const eventsCount = mockEvents.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate.getMonth() === month.getMonth() && 
             eventDate.getFullYear() === month.getFullYear();
    }).length;

    return {
      month: format(month, 'MMM/yy', { locale: ptBR }),
      events: eventsCount
    };
  });

  const option = {
    title: {
      text: 'Eventos nos Últimos Meses',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#374151'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: monthlyData.map(item => item.month),
      axisLine: {
        lineStyle: {
          color: '#e5e7eb'
        }
      },
      axisLabel: {
        color: '#6b7280'
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#e5e7eb'
        }
      },
      axisLabel: {
        color: '#6b7280'
      },
      splitLine: {
        lineStyle: {
          color: '#f3f4f6'
        }
      }
    },
    series: [
      {
        name: 'Eventos',
        data: monthlyData.map(item => item.events),
        type: 'bar',
        itemStyle: {
          color: '#6366f1',
          borderRadius: [4, 4, 0, 0]
        },
        emphasis: {
          itemStyle: {
            color: '#4f46e5'
          }
        }
      }
    ]
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <ReactECharts
        option={option}
        style={{ height: '300px', width: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  );
};

export default EventsTimelineChart;
