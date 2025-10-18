import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    document.body.style.margin = 0;
  }, []);

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: 'linear-gradient(135deg, #5a2ca0 0%, #8a5eff 50%, #b47fff 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 10s ease infinite',
      }}
    >
      <main className="flex-grow-1 d-flex align-items-center justify-content-center text-center text-white px-3">
        <div>
          <h1
            className="fw-bold mb-3"
            style={{
              fontSize: '3rem',
              textShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
          >
            Welcome to <span style={{ color: '#e0d1ff' }}>GameHub</span>
          </h1>
          <p
            className="lead mb-4"
            style={{
              opacity: 0.9,
              fontWeight: 300,
            }}
          >
            Discover the best games, unlock new adventures, and save big.
          </p>
          <Link
            to="/purchase"
            className="btn btn-light btn-lg px-5 py-2"
            style={{
              borderRadius: '2rem',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(255,255,255,0.2)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,255,255,0.4)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(255,255,255,0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Shop Now
          </Link>
        </div>
      </main>

      {/* ✨ Gradient animation */}
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
}

export default Home;
