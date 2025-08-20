'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Event {
  id: string;
  name: string;
  date: string;
}

export default function AnalyticsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    try {
      const storedEvents = localStorage.getItem('events');
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      }
    } catch (error) {
      console.error('Error loading events from localStorage:', error);
    }
  }, []);

  // Calculate analytics from real data
  const calculateAnalytics = () => {
    const now = new Date();
    const upcomingEvents = events.filter(event => new Date(event.date) > now);
    const completedEvents = events.filter(event => new Date(event.date) <= now);
    
    return {
      totalEvents: events.length,
      totalAttendees: events.length * 20, // Mock attendee calculation
      upcomingEvents: upcomingEvents.length,
      completedEvents: completedEvents.length,
      averageAttendance: events.length > 0 ? 85 : 0, // Mock percentage
      popularEventType: 'Workshop' // Mock data
    };
  };

  const getRecentEvents = () => {
    return events
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4)
      .map(event => ({
        name: event.name,
        attendees: Math.floor(Math.random() * 50) + 20, // Mock attendees
        date: event.date,
        status: new Date(event.date) > new Date() ? 'Upcoming' : 'Completed'
      }));
  };

  if (!isHydrated) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '1.2rem', color: '#666' }}>Loading analytics...</div>
      </div>
    );
  }

  const analyticsData = calculateAnalytics();
  const recentEvents = getRecentEvents();

  return (
    <div>
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
        Event Analytics Dashboard
      </h1>

      {events.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '0.5rem',
          border: '1px solid #dee2e6'
        }}>
          <h3 style={{ color: '#666', marginBottom: '1rem' }}>No Events Found</h3>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            Create some events to see analytics data here.
          </p>
          <Link 
            href="/events/create"
            style={{
              padding: '1rem 1.5rem',
              backgroundColor: '#28a745',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '0.25rem',
              fontWeight: 'bold'
            }}
          >
            Create Your First Event
          </Link>
        </div>
      ) : (
        <>
          {/* Key Metrics */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            <div style={{ 
              padding: '1.5rem', 
              backgroundColor: '#e3f2fd', 
              borderRadius: '0.5rem',
              textAlign: 'center',
              border: '1px solid #bbdefb'
            }}>
              <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: '#1976d2' }}>
                {analyticsData.totalEvents}
              </h3>
              <p style={{ margin: 0, color: '#666', fontWeight: 'bold' }}>Total Events</p>
            </div>

            <div style={{ 
              padding: '1.5rem', 
              backgroundColor: '#e8f5e8', 
              borderRadius: '0.5rem',
              textAlign: 'center',
              border: '1px solid #c8e6c9'
            }}>
              <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: '#388e3c' }}>
                {analyticsData.totalAttendees}
              </h3>
              <p style={{ margin: 0, color: '#666', fontWeight: 'bold' }}>Total Attendees</p>
            </div>

            <div style={{ 
              padding: '1.5rem', 
              backgroundColor: '#fff3e0', 
              borderRadius: '0.5rem',
              textAlign: 'center',
              border: '1px solid #ffcc02'
            }}>
              <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: '#f57c00' }}>
                {analyticsData.upcomingEvents}
              </h3>
              <p style={{ margin: 0, color: '#666', fontWeight: 'bold' }}>Upcoming Events</p>
            </div>

            <div style={{ 
              padding: '1.5rem', 
              backgroundColor: '#fce4ec', 
              borderRadius: '0.5rem',
              textAlign: 'center',
              border: '1px solid #f8bbd9'
            }}>
              <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: '#c2185b' }}>
                {analyticsData.averageAttendance}%
              </h3>
              <p style={{ margin: 0, color: '#666', fontWeight: 'bold' }}>Avg Attendance</p>
            </div>
          </div>

          {/* Recent Events Table */}
          {recentEvents.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>
                Recent Events Performance
              </h2>
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '0.5rem', 
                border: '1px solid #ddd',
                overflow: 'hidden'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Event Name</th>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Date</th>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Attendees</th>
                      <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentEvents.map((event, index) => (
                      <tr key={index}>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>{event.name}</td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>{event.date}</td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>{event.attendees}</td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
                          <span style={{ 
                            padding: '0.25rem 0.75rem',
                            borderRadius: '1rem',
                            fontSize: '0.875rem',
                            fontWeight: 'bold',
                            backgroundColor: event.status === 'Completed' ? '#d4edda' : '#fff3cd',
                            color: event.status === 'Completed' ? '#155724' : '#856404'
                          }}>
                            {event.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Quick Actions */}
      <div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>
          Quick Actions
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link 
            href="/events/create"
            style={{
              padding: '1rem 1.5rem',
              backgroundColor: '#28a745',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '0.25rem',
              fontWeight: 'bold'
            }}
          >
            Create New Event
          </Link>
          <Link 
            href="/events"
            style={{
              padding: '1rem 1.5rem',
              backgroundColor: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '0.25rem',
              fontWeight: 'bold'
            }}
          >
            View All Events
          </Link>
        </div>
      </div>
    </div>
  );
}
