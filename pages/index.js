import { useEffect, useState } from 'react';

export default function Home() {
  const [stok, setStok] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch('https://rioo-project-web.vercel.app/stock/grow');
      const json = await res.json();
      
      if (json && json.status) {
        const filtered = [];

        if (Array.isArray(json.seeds)) filtered.push(...json.seeds);
        if (Array.isArray(json.gears)) filtered.push(...json.gears);
        if (Array.isArray(json.eggs)) filtered.push(...json.eggs);

        setStok(filtered);
      }
    } catch (err) {
      console.error('Gagal ambil stok:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      fontFamily: 'sans-serif',
      padding: '20px',
      backgroundColor: '#000',
      color: '#fff',
      minHeight: '100vh'
    }}>
      <h1>🌱 Info Stok Grow A Garden</h1>
      {loading ? (
        <p>Memuat stok...</p>
      ) : (
        <table border="1" cellPadding="8" style={{
          borderCollapse: 'collapse',
          marginTop: '20px',
          width: '100%',
          backgroundColor: '#111',
          borderColor: '#444'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#222' }}>
              <th>Item</th>
              <th>Stok</th>
            </tr>
          </thead>
          <tbody>
            {stok.map((item, i) => (
              <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#111' : '#1a1a1a' }}>
                <td>{item.name}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p style={{ marginTop: '20px', fontSize: '12px', color: '#888' }}>
        Auto refresh setiap 30 detik
      </p>
    </div>
  );
}