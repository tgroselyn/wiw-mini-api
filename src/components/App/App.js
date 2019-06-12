import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    shiftData: null
  }
  
  componentDidMount = () => {
    this.fetchShifts();
  }

  fetchShifts = () => {
    axios.get('/api/shift').then(response => {
      // console.log('response from fetch request:', response.data);
      this.setState({
        shiftData: response.data
      })
    }).catch(err => {
      console.log('error from fetch request', err);
    })
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>When I Might Work</h1>
          <h2>Mini API</h2>
          <h3>Built by Thomas Roselyn</h3>
        </header>
        <main>
            {this.state.shiftData &&
              this.state.shiftData.map(shift => {
                return <p key={shift.id}>start: {shift.start}, end: {shift.end}</p>
              })
            }
        </main>
      </div>
    );
  }

}

export default App;
