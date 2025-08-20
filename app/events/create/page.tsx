'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateEventPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    maxAttendees: '',
    currentAttendees: '',
    status: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create event object
    const newEvent = {
      id: Date.now().toString(),
      name: formData.title,
      date: formData.date,
      time: formData.time,
      description: formData.description,
      location: formData.location,
      maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : null,
      currentAttendees: formData.currentAttendees ? parseInt(formData.currentAttendees) : 0,
      status: formData.status
    };

    // Get existing events from localStorage
    try {
      const existingEvents = localStorage.getItem('events');
      const events = existingEvents ? JSON.parse(existingEvents) : [];
      
      // Add new event
      events.push(newEvent);
      
      // Save back to localStorage
      localStorage.setItem('events', JSON.stringify(events));
      
      // Redirect to events page
      router.push('/events');
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link 
          href="/events" 
          style={{ 
            color: '#007bff', 
            textDecoration: 'none',
            fontSize: '1rem'
          }}
        >
          ← Back to Events
        </Link>
      </div>

      <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#333' }}>
        Create New Event
      </h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            fontWeight: 'bold',
            color: '#333'
          }}>
            Event Title *
          </label>
          <input 
            type="text" 
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="Enter event title"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '0.25rem',
              fontSize: '1rem'
            }}
          />
        </div>

        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            fontWeight: 'bold',
            color: '#333'
          }}>
            Description
          </label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            placeholder="Describe your event"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '0.25rem',
              fontSize: '1rem',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: 'bold',
              color: '#333'
            }}>
              Date *
            </label>
            <input 
              type="date" 
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '0.25rem',
                fontSize: '1rem'
              }}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: 'bold',
              color: '#333'
            }}>
              Time *
            </label>
            <input 
              type="time" 
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '0.25rem',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            fontWeight: 'bold',
            color: '#333'
          }}>
            Location
          </label>
          <input 
            type="text" 
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Event location or virtual link"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '0.25rem',
              fontSize: '1rem'
            }}
          />
        </div>

        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            fontWeight: 'bold',
            color: '#333'
          }}>
            Maximum Attendees
          </label>
          <input 
            type="number" 
            name="maxAttendees"
            value={formData.maxAttendees}
            onChange={handleInputChange}
            min="1"
            placeholder="Enter maximum number of attendees"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '0.25rem',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: 'bold',
              color: '#333'
            }}>
              Current Attendees
            </label>
            <input 
              type="number" 
              name="currentAttendees"
              value={formData.currentAttendees}
              onChange={handleInputChange}
              min="0"
              placeholder="Number of registered attendees"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '0.25rem',
                fontSize: '1rem'
              }}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: 'bold',
              color: '#333'
            }}>
              Status *
            </label>
            <select 
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '0.25rem',
                fontSize: '1rem',
                backgroundColor: 'white'
              }}
            >
              <option value="">Select status</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button 
            type="submit"
            style={{
              flex: 1,
              padding: '1rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Create Event
          </button>
          <Link 
            href="/events"
            style={{
              flex: 1,
              padding: '1rem',
              backgroundColor: '#6c757d',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '0.25rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
