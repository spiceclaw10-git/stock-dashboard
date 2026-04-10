import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './App.css';

const API_KEY = 'FQK7ABGWB4CL76I5';
const BASE_URL = 'https://www.alphavantage.co/query';

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

const allSymbols = [...techStocks, ...defenseStocks].map(s => s.symbol);

const fetchStockData = async (symbol) => {
  try {
    const response = await fetch(
      `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`
    );
    const data = await response.json();
    return data['Time Series (Daily)'] || {};
  } catch (error) {
    console.error(`Error fetching ${symbol}:`, error);
    return {};
  }
};

const formatDate = (dateStr) => {
  const [year, month, day] = dateStr.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month) - 1]} ${parseInt(day)}`;
};

const filterDateRange = (timeSeries, startDate, endDate) => {
  return Object.entries(timeSeries)
    .filter(([date]) => date >= startDate && date <= endDate)
    .sort((a, b) => a[0].localeCompare(b[0]));
};

function App() {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      
      const allTimeSeries = {};
      
      for (const symbol of allSymbols) {
        const timeSeries = await fetchStockData(symbol);
        allTimeSeries[symbol] = timeSeries;
      }

      const startDate = '2026-01-01';
      const endDate = '2026-04-10';

      const filteredData = filterDateRange(allTimeSeries[allSymbols[0]], startDate, endDate);
      
      const chartData = filteredData.map(([date, values]) => {
        const dataPoint = { month: formatDate(date) };
        
        allSymbols.forEach(symbol => {
          if (allTimeSeries[symbol] && allTimeSeries[symbol][date]) {
            dataPoint[symbol] = parseFloat(allTimeSeries[symbol][date]['4. close']);
          }
        });
        
        return dataPoint;
      });

      setStockData(chartData);
      setLoading(false);
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <header>
          <h1>Stock Dashboard 2026</h1>
          <p>Loading stock data...</p>
        </header>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <header>
          <h1>Stock Dashboard 2026</h1>
          <p>Error: {error}</p>
        </header>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header>
        <h1>Stock Dashboard 2026</h1>
        <p>Top 5 Tech & Defense Contractors - Jan 2026 to Apr 2026</p>
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
