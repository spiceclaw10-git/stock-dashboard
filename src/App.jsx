import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './App.css';

const techStocks = [
  { name: 'Apple', symbol: 'AAPL', color: '#8884d8' },
  { name: 'Microsoft', symbol: 'MSFT', color: '#82ca9d' },
  { name: 'NVIDIA', symbol: 'NVDA', color: '#ffc658' },
  { name: 'Google', symbol: 'GOOGL', color: '#0088FE' },
  { name: 'Meta', symbol: 'META', color: '#FF8042' },
];

const defenseStocks = [
  { name: 'Lockheed Martin', symbol: 'LMT', color: '#8884d8' },
  { name: 'Raytheon', symbol: 'RTX', color: '#82ca9d' },
  { name: 'Northrop Grumman', symbol: 'NOC', color: '#ffc658' },
  { name: 'Boeing', symbol: 'BA', color: '#0088FE' },
  { name: 'General Dynamics', symbol: 'GD', color: '#FF8042' },
];

const generateStockData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, index) => {
    const base = 100 + index * 5;
    return {
      month,
      AAPL: Math.round(base + Math.random() * 20 - 10),
      MSFT: Math.round(base + 5 + Math.random() * 20 - 10),
      NVDA: Math.round(base + 10 + Math.random() * 30 - 15),
      GOOGL: Math.round(base + 3 + Math.random() * 20 - 10),
      META: Math.round(base + 8 + Math.random() * 25 - 12),
      LMT: Math.round(base + Math.random() * 15 - 7),
      RTX: Math.round(base + Math.random() * 15 - 7),
      NOC: Math.round(base + Math.random() * 15 - 7),
      BA: Math.round(base + Math.random() * 20 - 10),
      GD: Math.round(base + Math.random() * 15 - 7),
    };
  });
};

const stockData = generateStockData();

function App() {
  return (
    <div className="dashboard">
      <header>
        <h1>Stock Dashboard 2026</h1>
        <p>Top 5 Tech & Defense Contractors - Year to Date</p>
      </header>

      <section className="chart-section">
        <h2>Top 5 Tech Stocks</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={stockData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Legend />
              {techStocks.map((stock) => (
                <Line
                  key={stock.symbol}
                  type="monotone"
                  dataKey={stock.symbol}
                  stroke={stock.color}
                  strokeWidth={2}
                  name={stock.name}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="chart-section">
        <h2>Top 5 Defense Contractors</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={stockData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Legend />
              {defenseStocks.map((stock) => (
                <Line
                  key={stock.symbol}
                  type="monotone"
                  dataKey={stock.symbol}
                  stroke={stock.color}
                  strokeWidth={2}
                  name={stock.name}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}

export default App;