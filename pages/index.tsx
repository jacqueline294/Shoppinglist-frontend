import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333' }}>Welcome to Shopping List App</h1>
      <p style={{ fontSize: '1.2rem', color: '#555', margin: '20px 0' }}>
        Manage your shopping list easily and efficiently.
      </p>

      <div style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#444' }}>Get Started</h2>
        <p>Would you like to sign up or log in?</p>

        <div style={{ marginTop: '20px' }}>
          <Link href="/signup">
            <button style={{ padding: '12px 24px', fontSize: '16px', marginRight: '10px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Sign Up
            </button>
          </Link>

          <Link href="/login">
            <button style={{ padding: '12px 24px', fontSize: '16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Log In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
