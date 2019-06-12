import React from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const fetchShifts = () => {
    const response = axios.get('/api/shift');
    console.log(response.data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={fetchShifts}>Load Shifts</button>
      </header>
    </div>
  );
}

export default App;
