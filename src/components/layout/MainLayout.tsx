import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import EventForm from '../events/EventForm';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { Event } from '../../types';

const MainLayout: React.FC = () => {
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const { addEvent, updateEvent } = useData();
  const { user } = useAuth();

  const handleNewEventClick = () => {
    setEditingEvent(null);
    setShowEventForm(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setShowEventForm(true);
  };

  const handleCloseForm = () => {
    setShowEventForm(false);
    setEditingEvent(null);
  };

  const handleEventSave = (eventData: any) => {
    if (!user) return;

    if (editingEvent && editingEvent.id) {
      updateEvent({ ...editingEvent, ...eventData });
    } else {
      const newEventData = {
        ...eventData,
        responsibleId: user.id,
        responsible: user.name,
        sector: user.sector,
        participants: [],
        documents: [],
        status: 'agendado',
      };
      addEvent(newEventData);
    }
    handleCloseForm();
  };

  const contextValue = {
    handleNewEventClick,
    handleEditEvent,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onNewEventClick={handleNewEventClick} />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet context={contextValue} />
        </main>
      </div>
      
      {showEventForm && (
        <EventForm
          eventToEdit={editingEvent}
          onClose={handleCloseForm}
          onSave={handleEventSave}
        />
      )}
    </div>
  );
};

export default MainLayout;
