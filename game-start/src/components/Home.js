import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <main
        style={{
            flex: 1, // let main grow to fill available vertical space between header/footer
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg,#6f42c1 0%,#9966ff 100%)',
            color: '#fff',
            textAlign: 'center',
            padding: '3rem 1rem',
        }}
        >
            <div>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '.75rem' }}>Welcome to GameVault</h1> 
                <p style={{ marginBottom: '1rem' }}>Discover the best games at unbeatable prices</p>
                <Link className="btn btn-light btn-lg" to="/purchase">Shop Now</Link>
            </div>
        </main>

      <footer className="py-4 text-white" style={{ backgroundColor: '#6f42c1' }}>
        <div className="container text-center">
          <p className="mb-0">&copy; 2025 GameVault. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;