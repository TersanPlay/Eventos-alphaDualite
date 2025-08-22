import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Event } from '../types';
import { eventTypes, eventLocations } from '../utils/mockData';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const useExport = () => {
  const exportToPDF = (events: Event[]) => {
    const doc = new jsPDF();
    const tableColumn = ["Título", "Tipo", "Data de Início", "Local", "Status"];
    const tableRows: any[] = [];

    events.forEach(event => {
      const eventData = [
        event.title,
        eventTypes[event.type],
        format(new Date(event.startDate), 'dd/MM/yyyy HH:mm', { locale: ptBR }),
        eventLocations[event.location],
        event.status
      ];
      tableRows.push(eventData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.text("Relatório de Eventos", 14, 15);
    doc.save("relatorio_eventos.pdf");
  };

  const formatICSDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const exportToICS = (events: Event[]) => {
    let icsString = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//EventosGov//Sistema de Eventos//PT\n';

    events.forEach(event => {
      icsString += 'BEGIN:VEVENT\n';
      icsString += `UID:${event.id}\n`;
      icsString += `DTSTAMP:${formatICSDate(new Date())}\n`;
      icsString += `DTSTART:${formatICSDate(new Date(event.startDate))}\n`;
      icsString += `DTEND:${formatICSDate(new Date(event.endDate))}\n`;
      icsString += `SUMMARY:${event.title}\n`;
      icsString += `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}\n`;
      icsString += `LOCATION:${eventLocations[event.location]}${event.locationDetails ? ' - ' + event.locationDetails : ''}\n`;
      icsString += 'END:VEVENT\n';
    });

    icsString += 'END:VCALENDAR';

    const blob = new Blob([icsString], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'eventos.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return { exportToPDF, exportToICS };
};
