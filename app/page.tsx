import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container">
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#333' }}>
          Welcome to Mini Event Manager
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#666' }}>
          Manage your events efficiently and effectively
        </p>

        <div style={{ marginBottom: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/events"
            style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              backgroundColor: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '0.5rem',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
          >
            View All Events
          </Link>
          <Link
            href="/events/create"
            style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              backgroundColor: '#28a745',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '0.5rem',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
          >
            Create New Event
          </Link>
        </div>

        <div style={{ marginTop: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#333' }}>
            Quick Actions
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem'
          }}>
            <Link href="/events/create" style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '2rem',
                border: '2px solid #28a745',
                borderRadius: '0.75rem',
                backgroundColor: '#f8fff9',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  color: '#28a745'
                }}>
                  ➕
                </div>
                <h3 style={{ color: '#28a745', marginBottom: '1rem', fontSize: '1.4rem' }}>Create Events</h3>
                <p style={{ color: '#666', lineHeight: '1.5' }}>Start organizing your next event with our easy-to-use event creation form</p>
                <div style={{
                  marginTop: 'auto',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  borderRadius: '0.25rem',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  marginTop: '1.5rem'
                }}>
                  Create New Event
                </div>
              </div>
            </Link>

            <Link href="/events" style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '2rem',
                border: '2px solid #007bff',
                borderRadius: '0.75rem',
                backgroundColor: '#f8fbff',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  color: '#007bff'
                }}>
                  📅
                </div>
                <h3 style={{ color: '#007bff', marginBottom: '1rem', fontSize: '1.4rem' }}>Manage Events</h3>
                <p style={{ color: '#666', lineHeight: '1.5' }}>View, edit, and manage all your existing events in one convenient location</p>
                <div style={{
                  marginTop: 'auto',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  borderRadius: '0.25rem',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  marginTop: '1.5rem'
                }}>
                  View All Events
                </div>
              </div>
            </Link>

            <Link href="/events/analytics" style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '2rem',
                border: '2px solid #6f42c1',
                borderRadius: '0.75rem',
                backgroundColor: '#faf9ff',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  color: '#6f42c1'
                }}>
                  📊
                </div>
                <h3 style={{ color: '#6f42c1', marginBottom: '1rem', fontSize: '1.4rem' }}>Event Analytics</h3>
                <p style={{ color: '#666', lineHeight: '1.5' }}>Get detailed insights and analytics about your events and attendee engagement</p>
                <div style={{
                  marginTop: 'auto',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#6f42c1',
                  color: 'white',
                  borderRadius: '0.25rem',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  marginTop: '1.5rem'
                }}>
                  View Analytics
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
