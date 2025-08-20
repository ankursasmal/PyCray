'use client';

import { useState, useEffect } from 'react';

interface Event {
  id: string;
  name: string;
  description?: string;
  date: string;
  time?: string;
  location?: string;
  maxAttendees?: number;
  currentAttendees?: number;
  status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    location: '',
    maxAttendees: '',
    currentAttendees: '',
    status: 'upcoming' as 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  });

  useEffect(() => {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  const saveEvents = (newEvents: Event[]) => {
    setEvents(newEvents);
    localStorage.setItem('events', JSON.stringify(newEvents));
  };

  const addEvent = () => {
    if (!formData.name || !formData.date) {
      alert('Please fill in at least the event name and date');
      return;
    }

    const newEvent: Event = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : undefined,
      currentAttendees: formData.currentAttendees ? parseInt(formData.currentAttendees) : 0,
      status: formData.status
    };

    saveEvents([...events, newEvent]);
    setFormData({
      name: '',
      description: '',
      date: '',
      time: '',
      location: '',
      maxAttendees: '',
      currentAttendees: '',
      status: 'upcoming'
    });
  };

  const deleteEvent = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      saveEvents(events.filter(event => event.id !== id));
    }
  };

  const handleView = (event: Event) => {
    setSelectedEvent(event);
    setIsViewMode(true);
  };

  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setIsViewMode(false);
    setFormData({
      name: event.name,
      description: event.description || '',
      date: event.date,
      time: event.time || '',
      location: event.location || '',
      maxAttendees: event.maxAttendees?.toString() || '',
      currentAttendees: event.currentAttendees?.toString() || '',
      status: (event.status || 'upcoming') as 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
    });
  };

  const updateEvent = () => {
    if (!selectedEvent || !formData.name || !formData.date) {
      alert('Please fill in at least the event name and date');
      return;
    }

    const updatedEvent: Event = {
      ...selectedEvent,
      name: formData.name,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : undefined,
      currentAttendees: formData.currentAttendees ? parseInt(formData.currentAttendees) : 0,
      status: formData.status
    };

    saveEvents(events.map(event => event.id === selectedEvent.id ? updatedEvent : event));
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setIsViewMode(false);
    setFormData({
      name: '',
      description: '',
      date: '',
      time: '',
      location: '',
      maxAttendees: '',
      currentAttendees: '',
      status: 'upcoming'
    });
  };

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (event.location && event.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F9FAFB',
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '2.25rem',
          fontWeight: 'bold',
          color: '#1F2937',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          Event Management System
        </h1>

        {/* Add Event Form */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1F2937',
            marginBottom: '1rem'
          }}>
            Add New Event
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <input
              type="text"
              placeholder="Event Name *"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #D1D5DB',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #D1D5DB',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #D1D5DB',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #D1D5DB',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <input
              type="number"
              placeholder="Max Attendees"
              value={formData.maxAttendees}
              onChange={(e) => setFormData({...formData, maxAttendees: e.target.value})}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #D1D5DB',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <input
              type="number"
              placeholder="Current Attendees"
              value={formData.currentAttendees}
              onChange={(e) => setFormData({...formData, currentAttendees: e.target.value})}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #D1D5DB',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value as any})}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #D1D5DB',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                outline: 'none',
                backgroundColor: 'white'
              }}
            >
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <textarea
            placeholder="Event Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #D1D5DB',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              outline: 'none',
              minHeight: '80px',
              resize: 'vertical',
              marginBottom: '1rem'
            }}
          />
          <button
            onClick={addEvent}
            style={{
              backgroundColor: '#3B82F6',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.375rem',
              border: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Add Event
          </button>
        </div>

        {/* Search and Events List */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '0.75rem',
                border: '1px solid #D1D5DB',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                outline: 'none',
                width: '300px'
              }}
            />
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#1F2937'
            }}>
              Events ({filteredEvents.length})
            </h2>
          </div>
          <div style={{ overflowX: 'auto' }}>
            {filteredEvents.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '2rem 0',
                color: '#6B7280'
              }}>
                {searchTerm ? 'No events found matching your search.' : 'No events yet. Add your first event above!'}
              </div>
            ) : (
              <table style={{ width: '100%' }}>
                <thead style={{ backgroundColor: '#F9FAFB' }}>
                  <tr>
                    <th style={{
                      padding: '0.75rem 1.5rem',
                      textAlign: 'left',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      color: '#6B7280',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>Event Name</th>
                    <th style={{
                      padding: '0.75rem 1.5rem',
                      textAlign: 'left',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      color: '#6B7280',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>Date</th>
                    <th style={{
                      padding: '0.75rem 1.5rem',
                      textAlign: 'left',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      color: '#6B7280',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>Time</th>
                    <th style={{
                      padding: '0.75rem 1.5rem',
                      textAlign: 'left',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      color: '#6B7280',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>Status</th>
                    <th style={{
                      padding: '0.75rem 1.5rem',
                      textAlign: 'left',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      color: '#6B7280',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>Attendees</th>
                    <th style={{
                      padding: '0.75rem 1.5rem',
                      textAlign: 'left',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      color: '#6B7280',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>Actions</th>
                  </tr>
                </thead>
                <tbody style={{
                  backgroundColor: 'white',
                  borderTop: '1px solid #E5E7EB'
                }}>
                  {filteredEvents.map((event: Event) => (
                    <tr key={event.id} style={{
                      borderBottom: '1px solid #E5E7EB'
                    }}>
                      <td style={{
                        padding: '1rem 1.5rem',
                        whiteSpace: 'nowrap'
                      }}>
                        <div style={{
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          color: '#111827'
                        }}>{event.name}</div>
                        {event.location && (
                          <div style={{
                            fontSize: '0.875rem',
                            color: '#6B7280'
                          }}>📍 {event.location}</div>
                        )}
                      </td>
                      <td style={{
                        padding: '1rem 1.5rem',
                        whiteSpace: 'nowrap',
                        fontSize: '0.875rem',
                        color: '#111827'
                      }}>
                        {new Date(event.date).toLocaleDateString()}
                      </td>
                      <td style={{
                        padding: '1rem 1.5rem',
                        whiteSpace: 'nowrap',
                        fontSize: '0.875rem',
                        color: '#111827'
                      }}>
                        {event.time || 'Not set'}
                      </td>
                      <td style={{
                        padding: '1rem 1.5rem',
                        whiteSpace: 'nowrap'
                      }}>
                        <span style={{
                          display: 'inline-flex',
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          borderRadius: '9999px',
                          backgroundColor: 
                            event.status === 'upcoming' ? '#DBEAFE' :
                            event.status === 'ongoing' ? '#D1FAE5' :
                            event.status === 'completed' ? '#F3F4F6' :
                            event.status === 'cancelled' ? '#FEE2E2' :
                            '#F3F4F6',
                          color:
                            event.status === 'upcoming' ? '#1E40AF' :
                            event.status === 'ongoing' ? '#065F46' :
                            event.status === 'completed' ? '#1F2937' :
                            event.status === 'cancelled' ? '#991B1B' :
                            '#1F2937'
                        }}>
                          {event.status || 'Not set'}
                        </span>
                      </td>
                      <td style={{
                        padding: '1rem 1.5rem',
                        whiteSpace: 'nowrap',
                        fontSize: '0.875rem',
                        color: '#111827'
                      }}>
                        {event.currentAttendees || 0} / {event.maxAttendees || 'Unlimited'}
                      </td>
                      <td style={{
                        padding: '1rem 1.5rem',
                        whiteSpace: 'nowrap',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => handleView(event)}
                            style={{
                              color: '#2563EB',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '0.875rem'
                            }}
                          >
                            👁️ View
                          </button>
                          <button
                            onClick={() => handleEdit(event)}
                            style={{
                              color: '#059669',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '0.875rem'
                            }}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => deleteEvent(event.id)}
                            style={{
                              color: '#DC2626',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '0.875rem'
                            }}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* View/Edit Modal */}
        {selectedEvent && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 10px 25px 0 rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1F2937'
                }}>
                  {isViewMode ? 'View Event' : 'Edit Event'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    color: '#6B7280'
                  }}
                >
                  ×
                </button>
              </div>

              {isViewMode ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Event Name</label>
                    <div style={{ padding: '0.75rem', backgroundColor: '#F9FAFB', borderRadius: '0.375rem', marginTop: '0.25rem' }}>
                      {selectedEvent.name}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Date</label>
                    <div style={{ padding: '0.75rem', backgroundColor: '#F9FAFB', borderRadius: '0.375rem', marginTop: '0.25rem' }}>
                      {new Date(selectedEvent.date).toLocaleDateString()}
                    </div>
                  </div>
                  {selectedEvent.time && (
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Time</label>
                      <div style={{ padding: '0.75rem', backgroundColor: '#F9FAFB', borderRadius: '0.375rem', marginTop: '0.25rem' }}>
                        {selectedEvent.time}
                      </div>
                    </div>
                  )}
                  {selectedEvent.location && (
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Location</label>
                      <div style={{ padding: '0.75rem', backgroundColor: '#F9FAFB', borderRadius: '0.375rem', marginTop: '0.25rem' }}>
                        {selectedEvent.location}
                      </div>
                    </div>
                  )}
                  {selectedEvent.description && (
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Description</label>
                      <div style={{ padding: '0.75rem', backgroundColor: '#F9FAFB', borderRadius: '0.375rem', marginTop: '0.25rem' }}>
                        {selectedEvent.description}
                      </div>
                    </div>
                  )}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Max Attendees</label>
                      <div style={{ padding: '0.75rem', backgroundColor: '#F9FAFB', borderRadius: '0.375rem', marginTop: '0.25rem' }}>
                        {selectedEvent.maxAttendees || 'Unlimited'}
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Current Attendees</label>
                      <div style={{ padding: '0.75rem', backgroundColor: '#F9FAFB', borderRadius: '0.375rem', marginTop: '0.25rem' }}>
                        {selectedEvent.currentAttendees || 0}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Status</label>
                    <div style={{ padding: '0.75rem', backgroundColor: '#F9FAFB', borderRadius: '0.375rem', marginTop: '0.25rem' }}>
                      <span style={{
                        display: 'inline-flex',
                        padding: '0.25rem 0.5rem',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        borderRadius: '9999px',
                        backgroundColor: 
                          selectedEvent.status === 'upcoming' ? '#DBEAFE' :
                          selectedEvent.status === 'ongoing' ? '#D1FAE5' :
                          selectedEvent.status === 'completed' ? '#F3F4F6' :
                          selectedEvent.status === 'cancelled' ? '#FEE2E2' :
                          '#F3F4F6',
                        color:
                          selectedEvent.status === 'upcoming' ? '#1E40AF' :
                          selectedEvent.status === 'ongoing' ? '#065F46' :
                          selectedEvent.status === 'completed' ? '#1F2937' :
                          selectedEvent.status === 'cancelled' ? '#991B1B' :
                          '#1F2937'
                      }}>
                        {selectedEvent.status || 'Not set'}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1rem'
                  }}>
                    <input
                      type="text"
                      placeholder="Event Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #D1D5DB',
                        borderRadius: '0.375rem',
                        fontSize: '1rem',
                        outline: 'none'
                      }}
                    />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #D1D5DB',
                        borderRadius: '0.375rem',
                        fontSize: '1rem',
                        outline: 'none'
                      }}
                    />
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #D1D5DB',
                        borderRadius: '0.375rem',
                        fontSize: '1rem',
                        outline: 'none'
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #D1D5DB',
                        borderRadius: '0.375rem',
                        fontSize: '1rem',
                        outline: 'none'
                      }}
                    />
                    <input
                      type="number"
                      placeholder="Max Attendees"
                      value={formData.maxAttendees}
                      onChange={(e) => setFormData({...formData, maxAttendees: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #D1D5DB',
                        borderRadius: '0.375rem',
                        fontSize: '1rem',
                        outline: 'none'
                      }}
                    />
                    <input
                      type="number"
                      placeholder="Current Attendees"
                      value={formData.currentAttendees}
                      onChange={(e) => setFormData({...formData, currentAttendees: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #D1D5DB',
                        borderRadius: '0.375rem',
                        fontSize: '1rem',
                        outline: 'none'
                      }}
                    />
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #D1D5DB',
                        borderRadius: '0.375rem',
                        fontSize: '1rem',
                        outline: 'none',
                        backgroundColor: 'white'
                      }}
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <textarea
                    placeholder="Event Description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #D1D5DB',
                      borderRadius: '0.375rem',
                      fontSize: '1rem',
                      outline: 'none',
                      minHeight: '80px',
                      resize: 'vertical'
                    }}
                  />
                </div>
              )}

              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '0.75rem',
                marginTop: '1.5rem'
              }}>
                <button
                  onClick={handleCloseModal}
                  style={{
                    backgroundColor: '#F3F4F6',
                    color: '#374151',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.375rem',
                    border: 'none',
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                {!isViewMode && (
                  <button
                    onClick={updateEvent}
                    style={{
                      backgroundColor: '#059669',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.375rem',
                      border: 'none',
                      fontSize: '1rem',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Update Event
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
