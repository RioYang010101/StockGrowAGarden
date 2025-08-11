<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Grow A Garden Stock</title>
  <style>
    body {
      background-color: #0f0f0f;
      color: #f5f5f5;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    header {
      background-color: #1a1a1a;
      padding: 20px;
      text-align: center;
      border-bottom: 2px solid #ff4d00;
    }
    header h1 {
      margin: 0;
      color: #ff4d00;
      font-size: 28px;
    }
    main {
      padding: 20px;
      max-width: 1000px;
      margin: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      background-color: #1a1a1a;
      border-radius: 10px;
      overflow: hidden;
    }
    th, td {
      padding: 12px;
      border-bottom: 1px solid #333;
      text-align: left;
    }
    th {
      background-color: #262626;
      color: #ff4d00;
    }
    tr:hover {
      background-color: #262626;
    }
    .category {
      margin-top: 40px;
      font-size: 20px;
      border-left: 4px solid #ff4d00;
      padding-left: 10px;
    }
    footer {
      text-align: center;
      padding: 15px;
      margin-top: 40px;
      border-top: 1px solid #333;
      font-size: 14px;
      color: #888;
    }
  </style>
</head>
<body>
  <header>
    <h1>🌱 Grow A Garden Stock</h1>
  </header>

  <main>
    <div class="category">Seeds</div>
    <table id="seedsTable">
      <thead>
        <tr><th>Item</th><th>Stock</th></tr>
      </thead>
      <tbody></tbody>
    </table>

    <div class="category">Gears</div>
    <table id="gearsTable">
      <thead>
        <tr><th>Item</th><th>Stock</th></tr>
      </thead>
      <tbody></tbody>
    </table>

    <div class="category">Eggs</div>
    <table id="eggsTable">
      <thead>
        <tr><th>Item</th><th>Stock</th></tr>
      </thead>
      <tbody></tbody>
    </table>
  </main>

  <footer>
    Data otomatis diambil dari Grow A Garden API
  </footer>

  <script>
    async function loadStock() {
      try {
        const res = await fetch("https://rioo-project-web.vercel.app/stock/grow");
        const data = await res.json();

        if (!data || !data.data) return;

        fillTable("seedsTable", data.data.seeds);
        fillTable("gearsTable", data.data.gear);
        fillTable("eggsTable", data.data.eggs);
      } catch (e) {
        console.error(e);
      }
    }

    function fillTable(tableId, items) {
      const tbody = document.querySelector(`#${tableId} tbody`);
      tbody.innerHTML = "";
      for (let [name, stock] of Object.entries(items)) {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${name}</td><td>${stock}</td>`;
        tbody.appendChild(row);
      }
    }

    loadStock();
    setInterval(loadStock, 60000); // update setiap menit
  </script>
</body>
</html>