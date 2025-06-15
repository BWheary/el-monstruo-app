import { useState } from 'react';
import './App.css';

const initialPlayers = [
  { name: 'Silva', points: 0 },
  { name: 'Adolfo', points: 0 },
  { name: 'Yerlin', points: 0 },
];

export default function App() {
  const [players, setPlayers] = useState(initialPlayers);
  const [selectedPlayer, setSelectedPlayer] = useState(0);
  const [ev, setEV] = useState('');
  const [plusCount, setPlusCount] = useState(false);

  const updatePoints = (change) => {
    const updated = [...players];
    updated[selectedPlayer].points += change;
    setPlayers(updated);
  };

  const handleSubmit = () => {
    const evValue = parseFloat(ev);

    // Always add +1 for swinging in the Apple zone
    updatePoints(1);

    // Add +2 for 95+ EV
    if (evValue >= 95) {
      updatePoints(2);
    }
  };

  const handleWhiff = () => updatePoints(-1);
  const handleTakeStrike = () => updatePoints(-2);
  const handleTakeStrikePlusCount = () => updatePoints(-3);

  return (
    <div className="app">
      <h1>El Monstruo de la Manzana 🍎</h1>

      <div className="controls">
        <select onChange={(e) => setSelectedPlayer(Number(e.target.value))}>
          {players.map((p, i) => (
            <option key={i} value={i}>{p.name}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Exit Velocity (MPH)"
          value={ev}
          onChange={(e) => setEV(e.target.value)}
        />

        <button onClick={handleSubmit}>✅ Swing in Apple Zone</button>
        <button onClick={handleWhiff}>❌ Whiff in Apple Zone</button>
        <button onClick={handleTakeStrike}>👀 Take Strike in Apple</button>
        <button onClick={handleTakeStrikePlusCount}>⛔ Take Strike in Apple (+ Count)</button>
      </div>

      <h2>Leaderboard</h2>
      <ul>
        {[...players]
          .sort((a, b) => b.points - a.points)
          .map((p, i) => (
            <li key={i}>
              {p.name}: {p.points} {i === 0 ? '👑' : ''}
            </li>
          ))}
      </ul>
    </div>
  );
}
