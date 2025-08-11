import { useEffect, useState } from 'react';

export default function Home() {
  const [stok, setStok] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch('https://rioo-project-web.vercel.app/stock/grow');
      const json = await res.json();
      
      if (json && json.data) {
        const filtered = [];

        // Ambil hanya seeds, gear, eggs
        if (Array.isArray(json.data.seeds)) filtered.push(...json.data.seeds);
        if (Array.isArray(json.data.gear)) filtered.push(...json.data.gear);
        if (Array.isArray(json.data.eggs)) filtered.push(...json.data.eggs);

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
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>🌱 Info Stok Grow A Garden</h1>
      {loading ? (
        <p>Memuat stok...</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Stok</th>
            </tr>
          </thead>
          <tbody>
            {stok.map((item, i) => (
              <tr key={i}>
                <td>{item.emoji ? item.emoji + ' ' : ''}{item.name}</td>
                <td>{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        Auto refresh setiap 30 detik
      </p>
    </div>
  );
}