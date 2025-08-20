import '../styles.css';
import type { ReactNode } from 'react';

type EventsLayoutProperties = {
  readonly children: ReactNode;
};

const EventsLayout = ({ children }: EventsLayoutProperties) => (
  <div className="events-layout">
    <header style={{
      padding: '1rem 2rem',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #dee2e6',
      marginBottom: '2rem'
    }}>
      <h1 style={{ margin: 0, color: '#333' }}>Event Management</h1>
    </header>
    <main style={{ padding: '0 2rem' }}>
      {children}
    </main>
  </div>
);

export default EventsLayout;
